<?php
/**
 * Email Form Submission Handler
 * 
 * This endpoint handles form submissions from the React frontend
 * and sends emails to the shop owner via SMTP.
 */

header('Content-Type: application/json');

// Load configuration
require_once __DIR__ . '/config.php';

// Handle CORS
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, ALLOWED_ORIGINS)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
}

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Simple rate limiting (if enabled)
if (RATE_LIMIT_ENABLED) {
    $rateLimitFile = __DIR__ . '/rate_limit_' . md5($_SERVER['REMOTE_ADDR']) . '.txt';
    $currentTime = time();
    
    if (file_exists($rateLimitFile)) {
        $data = json_decode(file_get_contents($rateLimitFile), true);
        if ($data && ($currentTime - $data['first_request']) < RATE_LIMIT_WINDOW) {
            if ($data['count'] >= RATE_LIMIT_MAX_REQUESTS) {
                http_response_code(429);
                echo json_encode(['success' => false, 'message' => 'Too many requests. Please try again later.']);
                exit;
            }
            $data['count']++;
        } else {
            $data = ['first_request' => $currentTime, 'count' => 1];
        }
    } else {
        $data = ['first_request' => $currentTime, 'count' => 1];
    }
    file_put_contents($rateLimitFile, json_encode($data));
}

// Get and validate input data
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid request data']);
    exit;
}

// Validate required fields
$formType = $input['formType'] ?? '';
$requiredFields = ['name', 'number', 'service'];

foreach ($requiredFields as $field) {
    if (empty($input[$field])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => "Missing required field: $field"]);
        exit;
    }
}

// Sanitize input data
function sanitizeInput($data) {
    if (is_array($data)) {
        return array_map('sanitizeInput', $data);
    }
    return htmlspecialchars(strip_tags(trim($data)), ENT_QUOTES, 'UTF-8');
}

$formData = sanitizeInput($input);

// Prepare email content
$subject = $formType === 'quote' ? QUOTE_SUBJECT : CONTACT_SUBJECT;
$formTypeLabel = $formType === 'quote' ? 'Quote Request' : 'Contact Form';

// Build email body
$emailBody = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #f4f4f4; padding: 20px; border-radius: 5px 5px 0 0; }
        .content { background-color: #ffffff; padding: 20px; border: 1px solid #ddd; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #555; }
        .value { margin-top: 5px; padding: 8px; background-color: #f9f9f9; border-left: 3px solid #007bff; }
        .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #777; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>New {$formTypeLabel}</h2>
            <p>You have received a new form submission from your website.</p>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>Name:</div>
                <div class='value'>{$formData['name']}</div>
            </div>
            
            " . (!empty($formData['email']) ? "
            <div class='field'>
                <div class='label'>Email:</div>
                <div class='value'>{$formData['email']}</div>
            </div>
            " : "") . "
            
            <div class='field'>
                <div class='label'>Phone Number:</div>
                <div class='value'>{$formData['number']}</div>
            </div>
            
            " . (!empty($formData['vehicleType']) ? "
            <div class='field'>
                <div class='label'>Vehicle Type:</div>
                <div class='value'>{$formData['vehicleType']}</div>
            </div>
            " : "") . "
            
            " . (!empty($formData['brand']) ? "
            <div class='field'>
                <div class='label'>Vehicle Brand:</div>
                <div class='value'>{$formData['brand']}</div>
            </div>
            " : "") . "
            
            " . (!empty($formData['vehicleModel']) ? "
            <div class='field'>
                <div class='label'>Vehicle Model:</div>
                <div class='value'>{$formData['vehicleModel']}</div>
            </div>
            " : "") . "
            
            <div class='field'>
                <div class='label'>Service Requested:</div>
                <div class='value'>{$formData['service']}</div>
            </div>
            
            " . (!empty($formData['message']) ? "
            <div class='field'>
                <div class='label'>Message:</div>
                <div class='value'>" . nl2br($formData['message']) . "</div>
            </div>
            " : "") . "
            
            <div class='field'>
                <div class='label'>Submitted:</div>
                <div class='value'>" . date('F j, Y, g:i a') . "</div>
            </div>
        </div>
        <div class='footer'>
            <p>This email was sent automatically from your website contact form.</p>
        </div>
    </div>
</body>
</html>
";

// Try to use PHPMailer if available, otherwise fall back to mail()
$emailSent = false;
$errorMessage = '';

// Check if PHPMailer is available
$phpmailerPath = __DIR__ . '/PHPMailer/PHPMailer.php';
if (file_exists($phpmailerPath)) {
    require_once $phpmailerPath;
    require_once __DIR__ . '/PHPMailer/SMTP.php';
    require_once __DIR__ . '/PHPMailer/Exception.php';
    
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    
    try {
        $mail = new PHPMailer(true);
        
        // SMTP Configuration
        $mail->isSMTP();
        $mail->Host = SMTP_HOST;
        $mail->SMTPAuth = true;
        $mail->Username = SMTP_USERNAME;
        $mail->Password = SMTP_PASSWORD;
        $mail->SMTPSecure = SMTP_ENCRYPTION;
        $mail->Port = SMTP_PORT;
        $mail->CharSet = 'UTF-8';
        
        // Email settings
        $mail->setFrom(SMTP_FROM_EMAIL, SMTP_FROM_NAME);
        $mail->addAddress(SHOP_OWNER_EMAIL);
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = $emailBody;
        
        // Plain text alternative
        $mail->AltBody = strip_tags($emailBody);
        
        $mail->send();
        $emailSent = true;
    } catch (Exception $e) {
        $errorMessage = "PHPMailer Error: " . $mail->ErrorInfo;
    }
} else {
    // Fallback to PHP mail() function
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: " . SMTP_FROM_NAME . " <" . SMTP_FROM_EMAIL . ">" . "\r\n";
    $headers .= "Reply-To: " . (!empty($formData['email']) ? $formData['email'] : SMTP_FROM_EMAIL) . "\r\n";
    
    $emailSent = @mail(SHOP_OWNER_EMAIL, $subject, $emailBody, $headers);
    
    if (!$emailSent) {
        $errorMessage = "Failed to send email using PHP mail() function";
    }
}

// Return response
if ($emailSent) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Form submitted successfully. We will contact you soon!'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to send email. Please try again later or contact us directly.',
        'error' => $errorMessage
    ]);
}

