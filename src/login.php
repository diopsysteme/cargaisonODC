<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connexion</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="projet.css">
</head>

<body class="bg-gradient-to-br from-teal-300 to-blue-400 flex items-center justify-center h-screen">

    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div class="flex justify-center mb-6">
            <img src="logoS.png" alt="Logo" class="w-24">
        </div>
        <form action="?page=cargo" method="POST">
            <div class="space-y-4">
                <?php if (isset($_SESSION["error"]["all"])) { ?>
                    <div class="text-red-500 text-center mb-4"><?= $_SESSION["error"]["all"] ?></div>
                <?php } ?>
                <div>
                    <label for="email" class="block text-gray-700 font-bold mb-2">Email</label>
                    <input type="text" name="mail" id="email" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 <?= isset($_SESSION["error"]["mail"]) ? 'border-red-500' : '' ?>" placeholder="Enter email address">
                    <?php if (isset($_SESSION["error"]["mail"])) { ?>
                        <span class="text-red-500 text-sm"><?= $_SESSION["error"]["mail"] ?></span>
                    <?php } ?>
                </div>
                <div>
                    <label for="password" class="block text-gray-700 font-bold mb-2">Mot de passe</label>
                    <div class="relative">
                        <input type="password" name="password" id="passwordField" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 <?= isset($_SESSION["error"]["password"]) ? 'border-red-500' : '' ?>" placeholder="Enter your password">
                        <i id="togglePassword" class="fas fa-eye-slash absolute top-2.5 right-3 cursor-pointer text-blue-500"></i>
                    </div>
                    <?php if (isset($_SESSION["error"]["password"])) { ?>
                        <span class="text-red-500 text-sm"><?= $_SESSION["error"]["password"] ?></span>
                    <?php } ?>
                </div>
                <div class="flex items-center justify-between text-sm">
                    <label class="flex items-center">
                        <input type="checkbox" name="remember" class="mr-2">
                        Se souvenir de moi
                    </label>
                    <a href="#" class="text-blue-500 hover:underline">Mot de passe oublié?</a>
                </div>
                <button type="submit" name="login" class="w-full bg-blue-600 text-white py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Connexion</button>
            </div>
        </form>
    </div>

    <script>
        document.getElementById('togglePassword').addEventListener('click', function () {
            const passwordField = document.getElementById('passwordField');
            const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordField.setAttribute('type', type);
            this.classList.toggle('fa-eye-slash');
            this.classList.toggle('fa-eye');
        });
    </script>
</body>

</html>
