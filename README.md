
# CIRS
Studienprojektarbeit im Fach Medizinische Informatik im Wintersemester 2017/2018. Erstellt von Markus Bockhacker.

## Datenbank
- MongoDb
- Host: localhost
- Port: 27017
- Database: Cirs
- Collections:
    - incidents
    - users

Eine Out-Of-The-Box Installation in einem Docker-Container funkioniert gut. Die User-Tabelle muss mit einem gültigen User enthalten. Das Password muss mittels salted bcrypt gehashed sein. In der Datei "api/routes/auth.route.js" kann eine Log-Option aktiviert werden die jedes eingegebene Passwort im richtigen Hash in die server-seitige Konsole schreibt. Diese kann dann für einen bekannten User in die Datenbank geschrieben werden.

### Database-Export
Die im Ordner "database-export" liegenden Dateien zeigen einen Besipiel-State und können für Tests importiert werden.

## API

    cd api/
    npm install
    node server

Unit Tests:

    npm test

## Client

    cd client/
    npm install
    ng serve

