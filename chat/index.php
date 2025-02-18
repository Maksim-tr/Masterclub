<?php
session_start();

// Обработка имени пользователя
if (isset($_POST['username'])) {
    $username = filter_input(INPUT_POST, 'username', FILTER_SANITIZE_STRING);
    if (strlen($username) > 20) {
        $username = substr($username, 0, 20); // Ограничиваем длину имени пользователя
    }
    $_SESSION['username'] = htmlspecialchars($username);
    session_regenerate_id(true); // Обновляем ID сессии для безопасности
}

// Обработка сообщений
if (isset($_POST['message']) && isset($_SESSION['username'])) {
    $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);
    if (strlen($message) > 500) {
        $message = substr($message, 0, 500); // Ограничиваем длину сообщения
    }
    $_SESSION['messages'][] = array('username' => $_SESSION['username'], 'message' => htmlspecialchars($message));
}

// Очистка сообщений при выходе
if (isset($_GET['logout'])) {
    session_destroy();
    header("Location: index.php");
    exit;
}

?>

<!DOCTYPE html>
<html>
<head>
    <title>Простой Чат</title>
    <style>
        body { font-family: sans-serif; }
        #chatbox { width: 500px; height: 300px; border: 1px solid #ccc; overflow-y: scroll; padding: 10px; }
        #inputbox { width: 490px; margin-top: 10px; }
    </style>
</head>
<body>

<?php if (!isset($_SESSION['username'])): ?>
    <h2>Введите имя пользователя:</h2>
    <form method="post">
        <input type="text" name="username" placeholder="Имя пользователя" required>
        <button type="submit">Войти в чат</button>
    </form>
<?php else: ?>
    <h2>Чат, пользователь: <?php echo htmlspecialchars($_SESSION['username']); ?></h2>

    <div id="chatbox">
        <?php
        if (isset($_SESSION['messages'])) {
            foreach ($_SESSION['messages'] as $message) {
                echo "<p><strong>" . htmlspecialchars($message['username']) . ":</strong> " . htmlspecialchars($message['message']) . "</p>";
            }
        } else {
            echo "Пока нет сообщений.";
        }
        ?>
    </div>

    <form method="post">
        <input type="text" name="message" id="inputbox" placeholder="Введите ваше сообщение" required>
        <button type="submit">Отправить</button>
    </form>

    <p><a href="index.php?logout=true">Выйти</a></p>

<?php endif; ?>

</body>
</html>
