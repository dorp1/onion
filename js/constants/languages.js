'use strict';

const languages = {
    'en-US': {
        'EOL Title': 'End Of Life',
        'EOL Text': 'As of September 8 2018, ascribe has been shut down.',
        'EOL Action': 'Learn more',
        'ID': 'ID',
        'Actions': 'Actions',
        'Hide': 'Hide',
        'Show the edition': 'Show the edition',
        'Show all %d Editions': 'Show all %d Editions',
        'by %s': 'by %s',
        'Account Settings': 'Account Settings',
        'FAQ': 'FAQ',
        'Terms of Service': 'Terms of Service',
        'Log out': 'Log out',
        'Previous': 'Previous',
        'Next': 'Next',
        '%s license': '%s license',
        'Log into': 'Log into',
        'Email': 'Email',
        'EMAIL': 'EMAIL',
        'Enter your email': 'Enter your email',
        'Password': 'Password',
        'Enter your password': 'Enter your password',
        'Not an ascribe user': 'Not an ascribe user',
        'Sign up': 'Sign up',
        'Forgot my password': 'Forgot my password',
        'Rescue me': 'Rescue me',
        'LOGIN': 'LOGIN',
        'SIGNUP': 'SIGNUP',
        'Welcome to': 'Welcome to',
        'Sign up to ascribe': 'Sign up to ascribe',
        'Enter your password once again': 'Enter your password once again',
        'Enter a promocode here (Optional)': 'Enter a promocode here (Optional)',
        'I agree to the': 'I agree to the',
        'Confirm Password': 'Confirm Password',
        'Promocode': 'Promocode',
        'Promocode (Optional)': 'Promocode (Optional)',
        'Sign up successful': 'Sign up successful',
        'We sent an email to your address': 'We sent an email to your address',
        'please confirm': 'please confirm',
        'Your password must be at least 10 characters': 'Your password must be at least 10 characters',
        'This password is securing your digital property like a bank account': 'This password is securing your digital property like a bank account',
        'Store it in a safe place': 'Store it in a safe place',
        'Reset the password for': 'Reset the password for',
        'Reset your ascribe password': 'Reset your ascribe password',
        'An email has been sent to': 'An email has been sent to',
        'Request successfully sent, check your email': 'Request successfully sent, check your email',
        'Reset your password': 'Reset your password',
        'Enter your email and we\'ll send a link': 'Enter your email and we\'ll send a link',
        'password successfully updated': 'password successfully updated',
        'Enter a new password': 'Enter a new password',
        'Something went wrong, please try again later': 'Something went wrong, please try again later',
        'username succesfully updated': 'username succesfully updated',
        'Username': 'Username',
        'Enter your username': 'Enter your username',
        'Choose your Language': 'Choose your Language',
        'Bitcoin public key': 'Bitcoin public key',
        'Root Address': 'Root Address',
        'Crypto Wallet': 'Crypto Wallet',
        'Application successfully created': 'Application successfully created',
        'Token refreshed': 'Token refreshed',
        'REFRESH': 'REFRESH',
        'API Integration': 'API Integration',
        'Application Name': 'Application Name',
        'Enter the name of your app': 'Enter the name of your app',
        'Account': 'Account',
        'Copyright license%s': 'Copyright license%s',
        'Files to upload': 'Files to upload',
        'Register your work': 'Register your work',
        'Artist Name': 'Artist Name',
        'The name of the creator': 'The name of the creator',
        'Number of editions': 'Number of editions',
        'Artwork title': 'Artwork title',
        'The title of the artwork': 'The title of the artwork',
        'Year Created': 'Year Created',
        'Year Created (e.g. 2015)': 'Year Created (e.g. 2015)',
        'Specify the number of unique editions for this artwork': 'Specify the number of unique editions for this artwork',
        'Please login before ascribing your work%s': 'Please login before ascribing your work%s',
        'Click or drag to add files': 'Click or drag to add files',
        'Click or drag to add a file': 'Click or drag to add a file',
        'Register your artwork': 'Register your artwork',
        'Register work': 'Register work',
        'Learn more': 'Learn more',
        'api': 'api',
        'impressum': 'impressum',
        'terms of service': 'terms of service',
        'privacy': 'privacy',
        'Search%s': 'Search%s',
        'Hide all Editions': 'Hide all Editions',
        'Hide editions': 'Hide editions',
        'Show all Editions': 'Show all Editions',
        'Show editions': 'Show editions',
        'Edition': 'Edition',
        'Work': 'Work',
        'You don\'t have any works yet%s': 'You don\'t have any works yet%s',
        'To register one, click': 'To register one, click',
        'here': 'here',
        'Consign artwork': 'Consign artwork',
        'Unconsign artwork': 'Unconsign artwork',
        'Have the owner manage his sales again': 'Have the owner manage his sales again',
        'Transfer artwork': 'Transfer artwork',
        'Transfer the ownership of the artwork': 'Transfer the ownership of the artwork',
        'Loan artwork': 'Loan artwork',
        'Loan your artwork for a limited period of time': 'Loan your artwork for a limited period of time',
        'Share artwork': 'Share artwork',
        'Share the artwork': 'Share the artwork',
        'Remove Edition': 'Remove Edition',
        'Click to remove edition': 'Click to remove edition',
        'hide': 'hide',
        'show': 'show',
        'Hi': 'Hi',
        'I am sharing': 'I am sharing',
        'with you': 'with you',
        'Truly yours': 'Truly yours',
        'Comma separated emails': 'Comma separated emails',
        'SHARE': 'SHARE',
        'I consign': 'I consign',
        'to you': 'to you',
        'Consignee email': 'Consignee email',
        'CONSIGN': 'CONSIGN',
        'REMOVE FROM COLLECTION': 'REMOVE FROM COLLECTION',
        'Further Details': 'Further Details',
        'Certificate of Authenticity': 'Certificate of Authenticity',
        'Provenance/Ownership History': 'Provenance/Ownership History',
        'Consignment History': 'Consignment History',
        'SPOOL Details': 'SPOOL Details',
        'Download': 'Download',
        'invisible': 'invisible',
        'TITLE': 'TITLE',
        'BY': 'BY',
        'DATE': 'DATE',
        'STATUS': 'STATUS',
        'EDITION': 'EDITION',
        'of': 'of',
        'OWNER': 'OWNER',
        'Private note saved': 'Private note saved',
        'Personal note (private)': 'Personal note (private)',
        'Enter a personal note%s': 'Enter a personal note%s',
        'Public note saved': 'Public note saved',
        'Edition note (public)': 'Edition note (public)',
        'Enter a public note for this edition%s': 'Enter a public note for this edition%s',
        'Details updated': 'Details updated',
        'Artist Contact Info': 'Artist Contact Info',
        'Display Instructions': 'Display Instructions',
        'Technology Details': 'Technology Details',
        'Additional files': 'Additional files',
        'Verify': 'Verify',
        'Artwork ID': 'Artwork ID',
        'Hash of Artwork, title, etc': 'Hash of Artwork, title, etc',
        'Owned by SPOOL address': 'Owned by SPOOL address',
        'Are you sure you would like to permanently delete this edition%s': 'Are you sure you would like to permanently delete this edition%s',
        'This is an irrevocable action%s': 'You can not undo this action%s',
        'DELETE': 'DELETE',
        'YES, DELETE': 'YES, DELETE',
        'CLOSE': 'CLOSE',
        'I loan': 'I loan',
        'terms of': 'terms of',
        'Loanee email': 'Loanee email',
        'Gallery/exhibition (optional)': 'Gallery/exhibition (optional)',
        'Loan start date': 'Loan start date',
        'Loan end date': 'Loan end date',
        'LOAN': 'LOAN',
        'I transfer ownership of': 'I transfer ownership of',
        'Transferee email': 'Transferee email',
        'TRANSFER': 'TRANSFER',
        'Forgot your password': 'Forgot your password',
        'Reset password': 'Reset password',
        'Not a member yet': 'Not a member yet',
        'Fill in%s': 'Fill in%s',
        'ACCEPT': 'ACCEPT',
        'REJECT': 'REJECT',
        'this edition%s': 'this edition%s',
        'RESET PASSWORD': 'RESET PASSWORD',
        'Choose a password': 'Choose a password',
        'I un-consign': 'I un-consign',
        'from you': 'from you',
        'UNCONSIGN': 'UNCONSIGN',
        'I request you to un-consign': 'I request you to un-consign',
        'UNCONSIGN REQUEST': 'UNCONSIGN REQUEST',
        'You have actions pending in one of your editions': 'You have actions pending in one of your editions',
        'Login successful': 'Login successful',
        'Log in to ascribe': 'Log in to ascribe',
        'Create an account': 'Create an account',
        'clear all': 'clear all',
        'hidden': 'hidden',
        'Editions selected': 'Editions selected',
        'Show Pieces that': 'Show Pieces that',
        'I can transfer': 'I can transfer',
        'I can consign': 'I can consign',
        'Remove file': 'Remove file',
        'Pause upload': 'Pause upload',
        'Resume uploading': 'Resume uploading',
        'Download file': 'Download file',
        'Verify your Certificate of Authenticity': 'Verify your Certificate of Authenticity',
        'ascribe is using the following public key for verification': 'ascribe is using the following public key for verification',
        'Message': 'Message',
        'Copy paste the message on the bottom of your Certificate of Authenticity': 'Copy paste the message on the bottom of your Certificate of Authenticity',
        'Copy paste the signature on the bottom of your Certificate of Authenticity': 'Copy paste the signature on the bottom of your Certificate of Authenticity',
        'WITHDRAW': 'WITHDRAW',
        'powered by': 'powered by',
        'COLLECTION': 'COLLECTION',
        'edition': 'edition',
        'Enter': 'Enter',
        'NEW WORK': 'NEW WORK',
        'Have someone else sell the artwork': 'Have someone else sell the artwork',
        'Loan History': 'Loan History',
        'Title': 'Title',
        'Specify editions': 'Specify editions',
        'Editions': 'Editions',
        'Create editions': 'Create editions',
        'I agree to the Terms of Service of ascribe': 'I agree to the Terms of Service of ascribe',
        'read': 'read',
        'If your email address exists in our database, you will receive a password recovery link in a few minutes.': 'If your email address exists in our database, you will receive a password recovery link in a few minutes.',
        'REGISTREE': 'REGISTREE',
        'Submit to the prize': 'Submit to the prize',
        'Submit': 'Submit',
        'Artist statement': 'Artist statement',
        'Enter your statement': 'Enter your statement',
        'Work description': 'Work description',
        'Enter the description for your work': 'Enter the description for your work',
        'I agree to the Terms of Service the art price': 'I agree to the Terms of Service the art price',
        'Log in': 'Log in',
        'Enter ascribe': 'Enter ascribe',
        'Sign up to the prize': 'Sign up to the prize',
        '(e.g. andy@warhol.co.uk)': '(e.g. andy@warhol.co.uk)',
        'Use a combination of minimum 10 chars and numbers': 'Use a combination of minimum 10 chars and numbers',
        'Log in with ascribe': 'Log in with ascribe',
        'Submitted to prize': 'Submitted to prize',
        'Welcome to ascribe': 'Welcome to ascribe',
        'CREATE EDITIONS': 'CREATE EDITIONS',
        'Remove Piece': 'Remove Piece'
    },
    'de': {
        'ID': 'ID',
        'Actions': 'Aktionen',
        'Hide': 'Verstecke',
        'Show the edition': 'Zeige die Edition',
        'Show all %d Editions': 'Zeige alle %d Editionen an',
        'by %s': 'von %s',
        'Account Settings': 'Kontoeinstellungen',
        'FAQ': 'Fragen & Antworten',
        'Terms of Service': 'AGB',
        'Log out': 'Log out',
        'Previous': 'Zurück',
        'Next': 'Weiter',
        '%s license': '%s license',
        'Log into': 'Log into',
        'Email': 'Email',
        'EMAIL': 'EMAIL',
        'Enter your email': 'Enter your email',
        'Password': 'Password',
        'Enter your password': 'Enter your password',
        'Not an ascribe user': 'Not an ascribe user',
        'Sign up': 'Sign up',
        'Forgot my password': 'Forgot my password',
        'Rescue me': 'Rescue me',
        'LOGIN': 'LOGIN',
        'SIGNUP': 'SIGNUP',
        'Welcome to': 'Welcome to',
        'Sign up to ascribe': 'Sign up to ascribe',
        'Enter your password once again': 'Enter your password once again',
        'Enter a promocode here (Optional)': 'Enter a promocode here (Optional)',
        'I agree to the': 'I agree to the',
        'Confirm Password': 'Confirm Password',
        'Promocode': 'Promocode',
        'Promocode (Optional)': 'Promocode (Optional)',
        'Sign up successful': 'Sign up successful',
        'We sent an email to your address': 'We sent an email to your address',
        'please confirm': 'please confirm',
        'Your password must be at least 10 characters': 'Your password must be at least 10 characters',
        'This password is securing your digital property like a bank account': 'This password is securing your digital property like a bank account',
        'Store it in a safe place': 'Store it in a safe place',
        'Reset the password for': 'Reset the password for',
        'Reset your ascribe password': 'Reset your ascribe password',
        'An email has been sent to': 'An email has been sent to',
        'Request successfully sent, check your email': 'Request successfully sent, check your email',
        'Reset your password': 'Reset your password',
        'Enter your email and we\'ll send a link': 'Enter your email and we\'ll send a link',
        'password successfully updated': 'password successfully updated',
        'Enter a new password': 'Enter a new password',
        'Something went wrong, please try again later': 'Something went wrong, please try again later',
        'username succesfully updated': 'username succesfully updated',
        'Username': 'Username',
        'Enter your username': 'Enter your username',
        'Choose your Language': 'Choose your Language',
        'Bitcoin public key': 'Bitcoin public key',
        'Root Address': 'Root Address',
        'Crypto Wallet': 'Crypto Wallet',
        'Application successfully created': 'Application successfully created',
        'Token refreshed': 'Token refreshed',
        'REFRESH': 'REFRESH',
        'API Integration': 'API Integration',
        'Application Name': 'Application Name',
        'Enter the name of your app': 'Enter the name of your app',
        'Account': 'Account',
        'Copyright license%s': 'Copyright license%s',
        'Files to upload': 'Files to upload',
        'Register your work': 'Register your work',
        'Artist Name': 'Artist Name',
        'The name of the creator': 'The name of the creator',
        'Number of editions': 'Number of editions',
        'Artwork title': 'Artwork title',
        'The title of the artwork': 'The title of the artwork',
        'Year Created': 'Year Created',
        'Year Created (e.g. 2015)': 'Year Created (e.g. 2015)',
        'Specify the number of unique editions for this artwork': 'Specify the number of unique editions for this artwork',
        'Please login before ascribing your work%s': 'Please login before ascribing your work%s',
        'Click or drag to add files': 'Click or drag to add files',
        'Click or drag to add a file': 'Click or drag to add a file',
        'Register your artwork': 'Register your artwork',
        'Register work': 'Register work',
        'Learn more': 'Learn more',
        'api': 'api',
        'impressum': 'impressum',
        'terms of service': 'terms of service',
        'privacy': 'privacy',
        'Search%s': 'Search%s',
        'Hide all Editions': 'Hide all Editions',
        'Hide editions': 'Hide editions',
        'Show all Editions': 'Show all Editions',
        'Show editions': 'Show editions',
        'Edition': 'Edition',
        'Work': 'Work',
        'You don\'t have any works yet%s': 'You don\'t have any works yet%s',
        'To register one, click': 'To register one, click',
        'here': 'here',
        'Consign artwork': 'Consign artwork',
        'Unconsign artwork': 'Unconsign artwork',
        'Have the owner manage his sales again': 'Have the owner manage his sales again',
        'Transfer artwork': 'Transfer artwork',
        'Transfer the ownership of the artwork': 'Transfer the ownership of the artwork',
        'Loan artwork': 'Loan artwork',
        'Loan your artwork for a limited period of time': 'Loan your artwork for a limited period of time',
        'Share artwork': 'Share artwork',
        'Share the artwork': 'Share the artwork',
        'Remove Edition': 'Remove Edition',
        'Click to remove edition': 'Click to remove edition',
        'hide': 'hide',
        'show': 'show',
        'Hi': 'Hi',
        'I am sharing': 'I am sharing',
        'with you': 'with you',
        'Truly yours': 'Truly yours',
        'Comma separated emails': 'Comma separated emails',
        'SHARE': 'SHARE',
        'I consign': 'I consign',
        'to you': 'to you',
        'Consignee email': 'Consignee email',
        'CONSIGN': 'CONSIGN',
        'REMOVE FROM COLLECTION': 'REMOVE FROM COLLECTION',
        'Further Details': 'Further Details',
        'Certificate of Authenticity': 'Certificate of Authenticity',
        'Provenance/Ownership History': 'Provenance/Ownership History',
        'Consignment History': 'Consignment History',
        'SPOOL Details': 'SPOOL Details',
        'Download': 'Download',
        'invisible': 'invisible',
        'TITLE': 'TITLE',
        'BY': 'BY',
        'DATE': 'DATE',
        'STATUS': 'STATUS',
        'EDITION': 'EDITION',
        'of': 'of',
        'OWNER': 'OWNER',
        'Private note saved': 'Private note saved',
        'Personal note (private)': 'Personal note (private)',
        'Enter a personal note%s': 'Enter a personal note%s',
        'Public note saved': 'Public note saved',
        'Edition note (public)': 'Edition note (public)',
        'Enter a public note for this edition%s': 'Enter a public note for this edition%s',
        'Details updated': 'Details updated',
        'Artist Contact Info': 'Artist Contact Info',
        'Display Instructions': 'Display Instructions',
        'Technology Details': 'Technology Details',
        'Additional files': 'Additional files',
        'Verify': 'Verify',
        'Artwork ID': 'Artwork ID',
        'Hash of Artwork, title, etc': 'Hash of Artwork, title, etc',
        'Owned by SPOOL address': 'Owned by SPOOL address',
        'Are you sure you would like to permanently delete this edition%s': 'Are you sure you would like to permanently delete this edition%s',
        'This is an irrevocable action%s': 'This is an irrevocable action%s',
        'DELETE': 'DELETE',
        'YES, DELETE': 'YES, DELETE',
        'CLOSE': 'CLOSE',
        'I loan': 'I loan',
        'terms of': 'terms of',
        'Loanee email': 'Loanee email',
        'Gallery/exhibition (optional)': 'Gallery/exhibition (optional)',
        'Loan start date': 'Loan start date',
        'Loan end date': 'Loan end date',
        'LOAN': 'LOAN',
        'I transfer ownership of': 'I transfer ownership of',
        'Transferee email': 'Transferee email',
        'TRANSFER': 'TRANSFER',
        'Forgot your password': 'Forgot your password',
        'Reset password': 'Reset password',
        'Not a member yet': 'Not a member yet',
        'Fill in%s': 'Fill in%s',
        'ACCEPT': 'ACCEPT',
        'REJECT': 'REJECT',
        'this edition%s': 'this edition%s',
        'RESET PASSWORD': 'RESET PASSWORD',
        'Choose a password': 'Choose a password',
        'I un-consign': 'I un-consign',
        'from you': 'from you',
        'UNCONSIGN': 'UNCONSIGN',
        'I request you to un-consign': 'I request you to un-consign',
        'UNCONSIGN REQUEST': 'UNCONSIGN REQUEST',
        'You have actions pending in one of your editions': 'You have actions pending in one of your editions',
        'Login successful': 'Login successful',
        'Log in to ascribe': 'Log in to ascribe',
        'Create an account': 'Create an account',
        'clear all': 'clear all',
        'hidden': 'hidden',
        'Editions selected': 'Editions selected',
        'Show Pieces that': 'Show Pieces that',
        'I can transfer': 'I can transfer',
        'I can consign': 'I can consign',
        'Remove file': 'Remove file',
        'Pause upload': 'Pause upload',
        'Resume uploading': 'Resume uploading',
        'Download file': 'Download file',
        'Verify your Certificate of Authenticity': 'Verify your Certificate of Authenticity',
        'ascribe is using the following public key for verification': 'ascribe is using the following public key for verification',
        'Message': 'Message',
        'Copy paste the message on the bottom of your Certificate of Authenticity': 'Copy paste the message on the bottom of your Certificate of Authenticity',
        'Copy paste the signature on the bottom of your Certificate of Authenticity': 'Copy paste the signature on the bottom of your Certificate of Authenticity',
        'WITHDRAW': 'WITHDRAW',
        'powered by': 'powered by',
        'COLLECTION': 'COLLECTION',
        'edition': 'edition',
        'Enter': 'Enter',
        'NEW WORK': 'NEW WORK',
        'Have someone else sell the artwork': 'Have someone else sell the artwork',
        'Loan History': 'Loan History',
        'Title': 'Titel',
        'Specify editions': 'Specify editions',
        'Editions': 'Editions',
        'Create editions': 'Create editions',
        'I agree to the Terms of Service': 'I agree to the Terms of Service',
        'read': 'read',
        'If your email address exists in our database, you will receive a password recovery link in a few minutes.': 'If your email address exists in our database, you will receive a password recovery link in a few minutes.',
        'REGISTREE': 'REGISTREE',
        'Submit to the prize': 'Submit to the prize',
        'Submit': 'Submit',
        'Artist statement': 'Artist statement',
        'Enter your statement': 'Enter your statement',
        'Work description': 'Work description',
        'Enter the description for your work': 'Enter the description for your work',
        'I agree to the Terms of Service the art price': 'I agree to the Terms of Service the art price',
        'Log in': 'Log in',
        'Enter ascribe': 'Enter ascribe',
        'Sign up to the prize': 'Sign up to the prize',
        '(e.g. andy@warhol.co.uk)': '(e.g. andy@warhol.co.uk)',
        'Use a combination of minimum 10 chars and numbers': 'Use a combination of minimum 10 chars and numbers',
        'Log in with ascribe': 'Log in with ascribe',
        'Submitted to prize': 'Submitted to prize',
        'Welcome to ascribe': 'Welcome to ascribe',
        'CREATE EDITIONS': 'CREATE EDITIONS',
        'Remove Piece': 'Remove Piece'
    },
    'fr': {
        'ID': 'ID',
        'Actions': 'Actions',
        'Hide': 'Cacher',
        'Show the edition': 'Montrer l\'Édition',
        'Show all %d Editions': 'Montrer toutes les Éditions',
        'by %s': 'by %s',
        'Account Settings': 'Paramètres du compte',
        'FAQ': 'FAQ',
        'Terms of Service': 'Conditions d\'Utilisations',
        'Log out': 'Quitter',
        'Previous': 'Précédent',
        'Next': 'Suivant',
        '%s license': '%s license',
        'Log into': 'Se connecter à',
        'Email': 'E-mail',
        'EMAIL': 'E-MAIL',
        'Enter your email': 'Entrez votre courriel',
        'Password': 'Mot de passe',
        'Enter your password': 'Entrez votre mot de passe',
        'Not an ascribe user': 'Pas un utilisateur d\'ascribe',
        'Sign up': 'Créer un compte',
        'Forgot my password': 'J\'ai oublié mon mot de passe',
        'Rescue me': 'Sauve-moi',
        'LOGIN': 'SE CONNECTER',
        'SIGNUP': 'CRÉER UN COMPTE',
        'Welcome to': 'Bienvenue chez',
        'Sign up to ascribe': 'S\'inscrire à ascribe',
        'Enter your password once again': 'Entrez votre mot de passe une fois de plus',
        'Enter a promocode here (Optional)': 'Entrez un code promotionnel ici (Facultatif)',
        'I agree to the': 'Je suis d\'accrod avec les',
        'Confirm Password': 'Confirmez le mot de passe',
        'Promocode': 'Code promotionnel',
        'Promocode (Optional)': 'Code promotionnel (Facultatif)',
        'Sign up successful': 'Inscription réussie',
        'We sent an email to your address': 'Nous avons envoyé un courriel à votre adresse',
        'please confirm': 'veuillez confirmer',
        'Your password must be at least 10 characters': 'Votre mot de passe doit être composé d\'au moins 10 caractères',
        'This password is securing your digital property like a bank account': 'Ce mot de passe sécurise votre propriété numérique tel un compte bancaire',
        'Store it in a safe place': 'Conservez-le dans un endroit sécuritaire',
        'Reset the password for': 'Réinitialiser le mot de passe pour',
        'Reset your ascribe password': 'Réinitialiser votre mot de passe ascribe',
        'An email has been sent to': 'Un courriel a été envoyé à',
        'Request successfully sent, check your email': 'Requête envoyée avec succès, veuillez consultez votre courrier électronique',
        'Reset your password': 'Réinitialiser votre mot de passe',
        'Enter your email and we\'ll send a link': 'Entrez votre courriel et nous vous enverrons un lien',
        'password successfully updated': 'mise à jour du mot de passe réussie',
        'Enter a new password': 'Entrez un nouveau mot de passe',
        'Something went wrong, please try again later': 'Quelque chose ne fonctionne pas, veuillez réessayer plus tard',
        'username succesfully updated': 'nom d\'utilisateur mis à jour avec succès',
        'Username': 'Nom d\'utilisateur',
        'Enter your username': 'Entrez votre nom d\'utilisateur',
        'Choose your Language': 'Choisissez votre langue',
        'Bitcoin public key': 'Clé publique Bitcoin',
        'Root Address': 'Adresse Racine',
        'Crypto Wallet': 'Porte-monnaie Crypto',
        'Application successfully created': 'Application créée avec succès',
        'Token refreshed': 'Jeton rafraîchi',
        'REFRESH': 'RAFRAÎCHIR',
        'API Integration': 'Intégration de l\'API',
        'Application Name': 'Nom de l\'Application',
        'Enter the name of your app': 'Entrez le nom de votre application',
        'Account': 'Compte',
        'Copyright license%s': 'License de droit d\'auteur%s',
        'Files to upload': 'Fichiers à télécharger',
        'Register your work': 'Verrouillez le titre',
        'Artist Name': 'Nom de l\'artiste',
        'The name of the creator': 'Le nom du créateur',
        'Number of editions': 'Nombre d\'éditions',
        'Artwork title': 'Titre de l\'oeuvre',
        'The title of the artwork': 'Le titre de l\'oeuvre',
        'Year Created': 'Année de la création',
        'Year Created (e.g. 2015)': 'Année de la création (e.g. 2015)',
        'Specify the number of unique editions for this artwork': 'Spécifiez le nombre d\'éditions uniques pour cette oeuvre',
        'Please login before ascribing your work%s': 'S\'il vous plaît vous identifier avant d\'attribuer votre oeuvre%s',
        'Click or drag to add files': 'Cliquez ou faites glisser pour ajouter des fichiers',
        'Click or drag to add a file': 'Cliquez ou faites glisser pour ajouter un fichier',
        'Register your artwork': 'Enregistrer votre oeuvre',
        'Register work': 'Enregistrer l\'oeuvre',
        'Learn more': 'En savoir plus',
        'api': 'api',
        'impressum': 'impressum',
        'terms of service': 'conditions d\'utilisation',
        'privacy': 'confidentialité',
        'Search%s': 'Rechercher%s',
        'Hide all Editions': 'Cacher toutes les Éditions',
        'Hide editions': 'Cacher les éditions',
        'Show all Editions': 'Montrer toutes les Éditions',
        'Show editions': 'Montrer les éditions',
        'Edition': 'Édition',
        'Work': 'Oeuvre',
        'You don\'t have any works yet%s': 'Vous n\'avez pas encore d\'oeuvres%s',
        'To register one, click': 'Pour en inscrire une, cliquez',
        'here': 'ici',
        'Consign artwork': 'Consigner l\'oeuvre',
        'Unconsign artwork': 'Déconsigner l\'oeuvre',
        'Have the owner manage his sales again': 'Demandez au propriétaire de gérer à nouveau ses ventes',
        'Transfer artwork': 'Transférez l\'oeuvre',
        'Transfer the ownership of the artwork': 'Transférez la propriété de l\'oeuvre',
        'Loan artwork': 'Prêtez l\'oeuvre',
        'Loan your artwork for a limited period of time': 'Prêtez votre oeuvre pour un temps limité',
        'Share artwork': 'Partagez l\'oeuvre',
        'Share the artwork': 'Partagez l\'oeuvre',
        'Remove Edition': 'Retirer l\'Édition',
        'Click to remove edition': 'Cliquez pour retirer l\'édition',
        'hide': 'cacher',
        'show': 'afficher',
        'Hi': 'Bonjour',
        'I am sharing': 'Je partage',
        'with you': 'avec vous',
        'Truly yours': 'Sincèrement',
        'Comma separated emails': 'courriel séparés par des virgules',
        'SHARE': 'PARTAGER',
        'I consign': 'Je consigne',
        'to you': 'pour vous',
        'Consignee email': 'Courriel du destinataire',
        'CONSIGN': 'CONSIGNER',
        'REMOVE FROM COLLECTION': 'RETIRER DE LA COLLECTION',
        'Further Details': 'Détails Supplémentaires',
        'Certificate of Authenticity': 'Certificat d\'Authenticité',
        'Provenance/Ownership History': 'Provenance / Historique de Possession',	// TODO review
        'Consignment History': 'Historique de consignation', 	// TODO review
        'SPOOL Details': 'Détails de spool',	// TODO review
        'Download': 'Télécharger',
        'invisible': 'invisible',
        'TITLE': 'TITRE',
        'BY': 'PAR',	// TODO review
        'DATE': 'DATE',
        'STATUS': 'STATUT',
        'EDITION': 'ÉDITION',
        'of': 'de',
        'OWNER': 'PROPRIÉTAIRE',
        'Private note saved': 'Note privée sauvegardée',
        'Personal note (private)': 'Note personnelle (privée)',
        'Enter a personal note%s': 'Entrez une note personnelle%s',
        'Public note saved': 'Note publique sauvegardée',
        'Edition note (public)': 'Note d\'Édition (publique)',
        'Enter a public note for this edition%s': 'Entrez une note publique pour cette édition%s',
        'Details updated': 'Détails mis à jour',
        'Artist Contact Info': 'Coordonnées de l\'artiste',
        'Display Instructions': 'Afficher les Instructions',
        'Technology Details': 'Détails technologique',
        'Additional files': 'fichiers supplémentaires',
        'Verify': 'Vérifiez',
        'Artwork ID': 'ID de l\'Oeuvre',
        'Hash of Artwork, title, etc': 'Valeur de hachage de l\'Oeuvre, titre, etc',
        'Owned by SPOOL address': 'Appartient via l\'adresse SPOOL',
        'Are you sure you would like to permanently delete this edition': 'Êtes-vous vraiment certaine de vouloir définitivement supprimer cette édition',
        'This is an irrevocable action%s': 'Ceci est une action irrévocable%s',
        'DELETE': 'SUPPRIMER',
        'YES, DELETE': 'OUI, SUPPRIMER',
        'CLOSE': 'FERMER',
        'I loan': 'Je prête',
        'terms of': 'conditions de',
        'Loanee email':	'courriel de l\'emprunteur',
        'Gallery/exhibition (optional)': 'Galerie/exposition (facultatif)',
        'Loan start date': 'Date du commencement du prêt',
        'Loan end date': 'Date de la fin de prêt',
        'LOAN': 'PRÊT',
        'I transfer ownership of': 'Je transfère la propriété de',
        'Transferee email': 'Courriel du cessionnaire',
        'TRANSFER': 'TRANSFÉRER',
        'Forgot your password': 'Oubliez votre mot de passe',
        'Reset password': 'Réinitialiser le mot de passe',
        'Not a member yet': 'Pas encore membre',
        'Fill in%s': 'Remplir%s',
        'ACCEPT': 'ACCEPTER',
        'REJECT': 'REJETER',
        'this edition%s': 'cette édition%s',
        'RESET PASSWORD': 'RÉINITIALISER LE MOT DE PASSE',
        'Choose a password': 'Choisir un mot de passe',
        'I un-consign': 'Je déconsigne',
        'from you': 'de vous',
        'UNCONSIGN': 'DÉCONSIGNER',
        'I request you to un-consign': 'Je vous demande de déconsigner',
        'UNCONSIGN REQUEST': 'DEMANDE DE DÉCONSIGNATION',
        'You have actions pending in one of your editions': 'Vous avez des actions en cours dans l\'une de vos éditions',
        'Login successful': 'Connexion réussie',
        'Log in to ascribe': 'Connectez-vous à ascribe',
        'Create an account': 'Créer un compte',
        'clear all': 'tout effacer',
        'hidden': 'hidden',
        'Editions selected': 'Éditions sélectionnées',
        'Show Pieces that': 'Afficher les oeuvres qui',
        'I can transfer': 'Je peux transférerr',
        'I can consign': 'Je peux consigner',
        'Remove file': 'Retirer le fichier',
        'Pause upload': 'Mettre en pause le téléchargement',
        'Resume uploading': 'Reprendre le téléchargement',
        'Download file': 'Télécharger le fichier',
        'Verify your Certificate of Authenticity': 'Vérifiez votre certificat d\'authenticité',
        'ascribe is using the following public key for verification': 'ascribe utilise la clé publique suivante pour à des fins de vérification',
        'Message': 'Message',
        'Copy paste the message on the bottom of your Certificate of Authenticity': 'Copier coller le message qui se trouve sur le bas de votre certificat d\'authenticité',
        'Copy paste the signature on the bottom of your Certificate of Authenticity': 'Copier coller la signature qui se trouve sur le bas de votre certificat d\'authenticité',
        'WITHDRAW': 'RETIRER',
        'powered by': 'alimenté par',   // TODO review
        'COLLECTION': 'COLLECTION',
        'edition': 'édition',
        'Enter': 'Entrez',
        'NEW WORK': 'NOUVEL OEUVRE',
        'Have someone else sell the artwork': 'Demandez à quelqu\'un de vendre l\'oeuvre',
        'Loan History': 'Historique de Prêts',
        'Title': 'Title',
        'Specify editions': 'Specify editions',
        'Editions': 'Editions',
        'Create editions': 'Create editions',
        'I agree to the Terms of Service': 'I agree to the Terms of Service',
        'read': 'read',
        'If your email address exists in our database, you will receive a password recovery link in a few minutes.': 'Si votre adresse électronique existe dans notre base de données, vous recevrez un lien de récupération de mot de passe dans quelques minutes.',
        'REGISTREE': 'REGISTREE',
        'Submit to the prize': 'Submit to the prize',
        'Submit': 'Submit',
        'Artist statement': 'Artist statement',
        'Enter your statement': 'Enter your statement',
        'Work description': 'Work description',
        'Enter the description for your work': 'Enter the description for your work',
        'I agree to the Terms of Service the art price': 'I agree to the Terms of Service the art price',
        'Log in': 'Log in',
        'Enter ascribe': 'Enter ascribe',
        'Sign up to the prize': 'Sign up to the prize',
        '(e.g. andy@warhol.co.uk)': '(e.g. andy@warhol.co.uk)',
        'Use a combination of minimum 10 chars and numbers': 'Use a combination of minimum 10 chars and numbers',
        'Log in with ascribe': 'Log in with ascribe',
        'Submitted to prize': 'Submitted to prize',
        'Welcome to ascribe': 'Welcome to ascribe',
        'CREATE EDITIONS': 'CREATE EDITIONS',
        'Remove Piece': 'Remove Piece'
    }
};

export default languages;
