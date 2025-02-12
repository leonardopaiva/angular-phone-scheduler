import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
  })
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthService
    ) {}

		/* 
			Para testar o guard, deve-se descomentar 
			const check = await firstValueFrom(this.authService.check());
			isso porque atualmente o guard sempre retorna true,
			porem caso exista uma rota da api para checar a autenticacao
			ao descomentar a chamada ao authService.check, o guard funcionara como esperado.
		*/
    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        
			try {

				// const check = await firstValueFrom(this.authService.check());
				let check = true;
				if (check) return true;

				this.authService.logout('Sua seção expirou!');
				return false;

			} catch {

				this.authService.logout('Sua seção expirou!');
				return false;

			}
    }
}