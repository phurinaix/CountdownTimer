document.getElementById("ok").addEventListener('click', receiveInput);
var leapYear = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var notLeapYear = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
inputCurrentDate();

//receive input by click on 'ok' button
function receiveInput(){
    var input = document.getElementById("dateInput").value;
    var inputClassify = input.split("-");
    var year = parseInt(inputClassify[0]);
    var month = parseInt(inputClassify[1]);
    var date = parseInt(inputClassify[2]);

    return {y: year, m: month, d: date};
}

//Show countdown time
function showResult(){
    if(compareDate(receiveInput()['d'], receiveInput()['m'], receiveInput()['y'])){
        document.getElementById("cText").innerHTML = "เหลือเวลาอีก";
        document.getElementById("cResult").innerHTML = getAllSeconds(receiveInput()['d'], receiveInput()['m'], receiveInput()['y']) + "<p>วินาที</p>";
    }
    else{
        document.getElementById("cText").innerHTML = "โปรดใส่ วัน เดือน ปี ในอนาคต";
        document.getElementById("cResult").innerHTML = "-_-";
    }
}
setInterval(showResult,1);

//Compare for proof that date is less than current date or not
function compareDate(date, month, year){
    if(year < currentYear()){
        return false;
    }
    
    else if(year == currentYear() && month < currentMonth()){
        return false;
    }
    else if(year == currentYear() && month == currentMonth() && date <= currentDate()){
        return false;
    }
    else{
        return true;
    }
}

function inputCurrentDate(){
    var dd = currentDate()+1;
    var mm = currentMonth();

    dd = (dd < 10 ? '0' + dd : dd);
    mm = (mm < 10 ? '0' + mm : mm);

    document.getElementById("dateInput").value = currentYear() + "-" + mm + "-" + dd;
}


function currentYear(){
    let today = new Date();
    let yyyy = today.getFullYear();
    return yyyy;
}
function currentMonth(){
    let today = new Date();
    let mm = today.getMonth()+1;
    return mm;
}
function currentDate(){
    let today = new Date();
    let dd = today.getDate();
    return dd;
}
function getSeconds(){
    let today = new Date();
    let h = today.getHours() * 60 * 60;
    let m = today.getMinutes() * 60;
    let s = today.getSeconds();

    //All seconds of current time (from 00.00 to currentTime)
    let sumSecondsCurrent = h + m + s;
    return sumSecondsCurrent;
}

function getAllSeconds(date, month, year){
    var diffDay = 0;
    var diffDayInYear1 = 0;
    var dayInYear = 0;
    var diffDayInYear2 = 0;
    var sumSec = 0;
    var y = year;

    if(year == currentYear()){
        diffDay = CountDayInYear(date, month, year) - CountDayInYear(currentDate(), currentMonth(), currentYear());
        sumSec = (diffDay * 24 * 60 * 60) - getSeconds();
        return sumSec;
    }
    if(year > currentYear()){
        diffDayInYear1 = numberOfDayInYear(currentYear()) - CountDayInYear(currentDate(), currentMonth(), currentYear());
        diffDayInYear2 = CountDayInYear(date, month, year);
        while((y - 1) > currentYear()){
            dayInYear += numberOfDayInYear(y - 1);
            y--;
        }
        diffDay = diffDayInYear1 + dayInYear + diffDayInYear2;
        sumSec = (diffDay * 24 * 60 * 60) - getSeconds();
        return sumSec;
    }
}

//Count day in year from 01/01/y to d/m/y
function CountDayInYear(date, month, year){
    let sumDate = 0;
    //if it's a leap year (366 days)
    if(isLeapYear(year)){
        if(month == 1){
            sumDate = date;
        }
        else{
            for(var i = 0 ; i < month - 1 ; i++){
                sumDate += leapYear[i];
            }
            sumDate += date;
        }
    }
    //if it's not a leap year (365 days)
    else{
        if(month == 1){
            sumDate = date;
        }
        else{
            for(var i = 0 ; i < month - 1 ; i++){
                sumDate += notLeapYear[i];
            }
            sumDate += date;
        }
    }
    return sumDate;
}

//If it's a leap year then it have 366 days but if not then it have 365 days
function numberOfDayInYear(year){
    if(isLeapYear(year)){
        return 366;
    }
    else{
        return 365;
    }
}

//leap year is year that in Febuary have 29 days
function isLeapYear(year){
    if(year % 4 != 0 || year % 100 == 0 && year % 400 != 0){
        return false;
    }
    else{
        return true;
    }
}