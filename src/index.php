<?php

    include("/var/www/html/prog1/config.php");
        if (isset($_GET['page'])){
            $pages=["cargo","produits","details"];
            $page = $_GET['page'];
            if(in_array($page,$pages)){
                include_once(FILE.$page.'.php');
            }
        }else{
            echo 'ddd';
        }