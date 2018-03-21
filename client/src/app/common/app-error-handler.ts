import { ErrorHandler } from '@angular/core';


export class AppErrorHandler implements ErrorHandler {
    handleError(error) {
        alert('Unexpeted error!');
        console.log('Error: ' + error);
    }
}
