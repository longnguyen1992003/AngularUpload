export class LocalStorageUlti{
  static  removeLoginInfor(){
    localStorage.clear()
  }
  static saveAccessToken(accessToken:string){
    localStorage.setItem('access_token',accessToken)
  }
  static getAccessToken(){
    localStorage.getItem('access_token')
  }
  static setRole(role:string){
    localStorage.setItem('role',role)
  }
  static getRole(){
    localStorage.getItem('role')
  }
  static setAccount(account:string){
    localStorage.setItem('account',account)
  }
  static getAccount(){
    localStorage.getItem('account')
  }

}
