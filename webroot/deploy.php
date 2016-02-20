<?php

require 'recipe/laravel.php';

// Define a server for deployment.
server('prod', 'audrius.io', 22)
  ->user('deployer')
  ->identityFile('~/.ssh/id_deployex.pub', '~/.ssh/id_deployex', '')
  ->stage('production')
  ->env('deploy_path', '/var/www/audious'); // Define the base path to deploy your project to.

// Set repository.
set('repository', 'git@github.com:ritey/audious.git');

// Path to composer.
set('composer_command', 'composer');

/**
 * Returns webroot folder.
 */
env('release_webroot', function () {
    return str_replace("\n", '', run("readlink {{deploy_path}}/release")) . '/webroot';
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

/*task('deploy', [
  'deploy:prepare',
  'deploy:update_code',
  'deploy:vendors',
  'deploy:symlink',
  'deploy:cleanup'
]);*/
