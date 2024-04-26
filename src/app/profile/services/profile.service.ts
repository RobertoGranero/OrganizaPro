import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User, UserPasswordEdit, UserProfileEdit } from '../../auth/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  #http = inject(HttpClient);
  #profileAuth = 'auth';

  getUser(id: string): Observable<User>{
    return this.#http.get<User>(`${this.#profileAuth}/${id}`).pipe(map((result) => result))
  }

  updateProfile(id: string, dataUpdate: UserProfileEdit): Observable<UserProfileEdit>{
    return this.#http.put<UserProfileEdit>(`${this.#profileAuth}/profile/${id}`, dataUpdate);
  }

  updatePassword(id: string, passwordInfo: UserPasswordEdit): Observable<void>{
    return this.#http.put<void>(`${this.#profileAuth}/password/${id}`, passwordInfo);
  }

  /*updateAvatar(dataUpdate: UserAvatarEdit) : Observable<void>{
    return this.#http.put<void>(`${this.#profileAuth}/me/avatar`, dataUpdate);
  } */

}
