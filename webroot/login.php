<?php 
    ob_start();  // PHP's output buffering feature
    if (!session_id()) session_start();
?>

<!-- php -S 127.0.0.1:8080 -t . -->

<!DOCTYPE html>
<html lang="en">

    <?php 

    // Define hashed username and password above webroot
    include(__DIR__ . '/../creds.php');

    //Now lets check to see if the form has been filled out. 
    if(isset($_POST['submit']) && isset($_POST['user']) && isset($_POST['password'])) 
    { 
        // OK they're set.  Let's see if they match
        if(password_verify(($_POST['user']),$username) && password_verify($_POST['password'],$password))
        { 
            //Ok the login worked.  Declare session variable with id 'loggedIn' value 1
            $_SESSION['loggedIn'] = true;
            header('Location: metrics.php');
            die();
        } 
        else 
        { 
            //Login Failed, display error 
            die("Your Login Information was Incorrect"); 
        } 
    } 
    else 
    { 
        //Login Field was blank, display the login form 
        ?> 
    
        <h1>Login</h1>
        <form name="form" method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
            <label for="user">Username:</label>
            <input type="text" title="Enter your Username" name="user" /></p>
            <label for="password">Password:</label>
            <input type="password" title="Enter your password" name="password" /></p>
            <input type="submit" name="submit" value="Login" /></p>
        </form>

        <?php         
    } 
    ?>

</html>
