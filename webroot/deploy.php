<?php

require 'recipe/laravel.php';

$path = '/var/www/audious';

// Define a server for deployment.
server('prod', 'audrius.io', 22)
  ->user('deployer')
  ->identityFile('~/.ssh/id_deployex.pub', '~/.ssh/id_deployex', '')
  ->stage('production')
  ->env('deploy_path', $path); // Define the base path to deploy your project to.

// Set repository.
set('repository', 'git@github.com:ritey/audious.git');

// Path to composer.
set('composer_command', 'composer');

// Set path.
env('path', $path);

/**
 * Returns webroot folder.
 */
env('release_webroot', function () {
    return str_replace("\n", '', run("readlink {{deploy_path}}/release")) . '/webroot';
});

/**
 * Release path
 */
env('release_path', function () {
    return str_replace("\n", '', run("readlink {{deploy_path}}/release"));
});

// Override original composer task.
/**
 * Installing vendors tasks.
 */
task('deploy:vendors', function () {
  $composer = get('composer_command');

  if (! commandExist($composer)) {
    run("cd {{release_webroot}} && curl -sS https://getcomposer.org/installer | php");
    $composer = 'php composer.phar';
  }
  $composerEnvVars = env('env_vars') ? 'export ' . env('env_vars') . ' &&' : '';
  run("cd {{release_webroot}} && $composerEnvVars $composer {{composer_options}}");
})->desc('Installing vendors');

/**
 * Make deployed files writable to www-data group.
 */
task('change_permissions', function() {
  run("chmod -R g+w {{release_path}}");
});
//after('deploy', 'change_permissions');

/**
 * Symlink .env file
 */
task('environment', function() {
  run("ln -s {{path}}/shared/.env {{release_webroot}}");
});

/**
 * Run Laravel5 optimisation commands.
 * Reference: http://sentinelstand.com/article/laravel-5-optimization-commands.
 */
task('optimise', function() {
  cd('{{deploy_path}}/release/webroot');
  run('php artisan optimize');
  run('php artisan config:cache');
  // Enable when route classes are being used.
  //run('php artisan route:cache');
});

// Deployment script.
task('deploy', [
  'deploy:prepare',
  'deploy:release',
  'deploy:update_code',
  'deploy:vendors',
  'deploy:shared',
  'change_permissions',
  'environment',
  'optimise',
  'deploy:symlink',
  'cleanup',
])->desc('Deploy your project');
