{{-- resources/views/test.blade.php --}}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Test Tailwind</title>
    @vite('resources/css/app.css')
    @vite('resources/js/app.js')

</head>
<body class="bg-gray-100 flex items-center justify-center h-screen">
    <h1 class="text-4xl font-bold text-blue-600">
        Tailwind Works!
    </h1>
</body>
</html>