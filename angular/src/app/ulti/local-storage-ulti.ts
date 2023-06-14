export class LocalStorageUlti{
  static  removeLoginInfor(){
    localStorage.clear()
  }
  static saveAccessToken(accessToken:string){
    localStorage.setItem('access_token',accessToken)
  }
  static getAccessToken(){
   return  localStorage.getItem('access_token')
  }
  static setRole(role:string){
    localStorage.setItem('role',role)
  }
  static getRole() {
    return localStorage.getItem('role');
  }
  static setAccount(account:string){
    localStorage.setItem('account',account)
  }
  static getAccount(){
    return  localStorage.getItem('account')
  }

}
