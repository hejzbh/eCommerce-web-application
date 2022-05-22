
export default class user{
    constructor(){
        this._locale = navigator.language;
        this._test = this._userCurrency();
    }

    async _userCurrency(){
        try {
            const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
            const resJSON = await res.json();

            console.log(resJSON);
        } catch(err){
            return err;
        }
    }
}



