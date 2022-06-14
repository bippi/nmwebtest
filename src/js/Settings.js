// Hér þarf að skipta út nýju URL-i
// let url = 'https://nmrestnew.azurewebsites.net'
// let url = 'https://nmresttest.azurewebsites.net'
let url = "http://localhost:8080";
if (App.apiUrl != "") {
  url = App.apiUrl;
}

const Settings = {
  dataUrl: url + "/",
};
export default Settings;
