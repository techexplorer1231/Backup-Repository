//variables to help in array creation
var childArray = [];
var tempSumJson = [];
var eachJson = [];
var compOperatorId = null;
var tempTripSummary;
var tmpFirstname;

//variables to help in addition of points
var tmpGeoFenceViolationCnt = 0;
var tmpCurfewViolationCnt = 0;
var tmpTotalPointsAfterTrip = 0;
var tmpTotalBadgesAfterTrip = 0;
var tmpDistanceCovered = 0;
var tmpSpeedViolationCnt = 0;
var tmpTripPoints = 0;
var tmpBadgesInTrip = 0;
var tmpTotalCredits = 0;
//


$(document).ready(function(e) {
    childArray = callParentService();
    //console.log(JSON.stringify(childArray));
    populateDateCombobox();
    tripSummary();
    createOperatorTable();
    commonPopulateDetailsUsingAnchor();
    commonPopulateDetailsUsingDrpDwn();
    //console.log(JSON.stringify(tempSumJson));   //output for SUM Json
    //console.log(JSON.stringify(eachJson));
});

function callParentService() {
    var temp = new function() {
        $.ajax({
            type: "GET",
            url: 'js/user.json',
            async: false,
            success: function(parent) {
                for (var i = 0; i < parent.childResources.length; i++) {
                    childArray = callChildService(parent.childResources[i], parent.childResources[i].operatorId);
                }
            }
        });
    };
    return childArray;
}

function callChildService(parent, opId) {
    var temp = new function() {
        $.ajax({
            type: "GET",
            url: 'js/userChild.json',
            async: false,
            success: function(child) {
                for (var i = 0; i < child.length; i++) {
                    if (opId === child[i].operatorId) { //remove if logic this when actually implementing
                        var tempJson = new function() {
                            this.operatorId = parent.operatorId;
                            this.eUAAccepted = parent.eUAAccepted;
                            this.operatorStatus = parent.operatorStatus;
                            this.snoozeStartTime = parent.snoozeStartTime;
                            this.snoozeEndTime = parent.snoozeEndTime;
                            this.dob = parent.dob;
                            this.resourceName = parent.resourceName;
                            this.primaryPhoneNumber = parent.primaryPhoneNumber;
                            this.primaryEmailAddress = parent.primaryEmailAddress;
                            this.firstName = parent.firstName;
                            this.geoFenceViolationCnt = child[i].geoFenceViolationCnt;
                            this.curfewViolationCnt = child[i].curfewViolationCnt;
                            this.totalPointsAfterTrip = child[i].totalPointsAfterTrip;
                            this.totalBadgesAfterTrip = child[i].totalBadgesAfterTrip;
                            this.tripStartDateTime = child[i].tripStartDateTime;
                            this.tripEndTime = child[i].tripEndTime;
                            this.distanceCovered = child[i].distanceCovered;
                            this.speedViolationCnt = child[i].speedViolationCnt;
                            this.tripPoints = child[i].tripPoints;
                            this.badgesInTrip = child[i].badgesInTrip;
                            this.totalCredits = child[i].totalCredits;
                            this.tripProcessed = child[i].tripProcessed;
                            this.tripDetail = child[i].tripDetail;
                            this.tripId = child[i].tripId;
                            this.tripSnoozed = child[i].tripSnoozed;
                            this.dropDown = "<select class='operatorRole'><option>Check</option></select>";
                        };
                        childArray.push(tempJson);
                    }
                }
            }
        });
    };
    return childArray;
}

function tripSummary() {

    compOperatorId = childArray[0].operatorId;
    // alert(compOperatorId);
    for (var i = 0; i < childArray.length; i++) {
        if (compOperatorId == childArray[i].operatorId) {
            callCreateSumJSON(childArray[i]);
        }
        else {
            tempSumJson.push(tempTripSummary);
            compOperatorId = childArray[i].operatorId;

            tmpGeoFenceViolationCnt = 0;
            tmpCurfewViolationCnt = 0;
            tmpTotalPointsAfterTrip = 0;
            tmpTotalBadgesAfterTrip = 0;
            tmpDistanceCovered = 0;
            tmpSpeedViolationCnt = 0;
            tmpTripPoints = 0;
            tmpBadgesInTrip = 0;
            tmpTotalCredits = 0;

            callCreateSumJSON(childArray[i]);
        }

    }
    tempSumJson.push(tempTripSummary);

}

function callCreateSumJSON(tempChildArray) {
    tempTripSummary = new function() {
        this.operatorId = tempChildArray.operatorId;
        this.eUAAccepted = tempChildArray.eUAAccepted;
        this.operatorStatus = tempChildArray.operatorStatus;
        this.snoozeStartTime = tempChildArray.snoozeStartTime;
        this.snoozeEndTime = tempChildArray.snoozeEndTime;
        this.dob = tempChildArray.dob;
        this.resourceName = tempChildArray.resourceName;
        this.primaryPhoneNumber = tempChildArray.primaryPhoneNumber;
        this.primaryEmailAddress = tempChildArray.primaryEmailAddress;
        this.firstName = tempChildArray.firstName;
        this.geoFenceViolationCnt = addPoints(tempChildArray.geoFenceViolationCnt, "tmpGeoFenceViolationCnt");
        this.curfewViolationCnt = addPoints(tempChildArray.curfewViolationCnt, "tmpCurfewViolationCnt");
        this.totalPointsAfterTrip = addPoints(tempChildArray.totalPointsAfterTrip, "tmpTotalPointsAfterTrip");
        this.totalBadgesAfterTrip = addPoints(tempChildArray.totalBadgesAfterTrip, "tmpTotalBadgesAfterTrip");
        this.tripStartDateTime = tempChildArray.tripStartDateTime;
        this.tripEndTime = tempChildArray.tripEndTime;
        this.distanceCovered = addPoints(tempChildArray.distanceCovered, "tmpDistanceCovered");
        this.speedViolationCnt = addPoints(tempChildArray.speedViolationCnt, "tmpSpeedViolationCnt");
        this.tripPoints = addPoints(tempChildArray.tripPoints, "tmpTripPoints");
        this.badgesInTrip = addPoints(tempChildArray.badgesInTrip, "tmpBadgesInTrip");
        this.totalCredits = addPoints(tempChildArray.totalCredits, "tmpTotalCredits");
        this.tripProcessed = tempChildArray.tripProcessed;
        this.tripDetail = tempChildArray.tripDetail;
        this.tripId = tempChildArray.tripId;
        this.tripSnoozed = tempChildArray.tripSnoozed;
        this.dropDown = "<select class='operatorRole'><option>Check</option></select>";
        //create Json
    };
}

function addPoints(actual, tmp) {
    var returnValue;
    if (tmp == "tmpGeoFenceViolationCnt") {
        tmpGeoFenceViolationCnt = actual + tmpGeoFenceViolationCnt;
        returnValue = tmpGeoFenceViolationCnt;
    }
    else if (tmp == "tmpCurfewViolationCnt") {
        tmpCurfewViolationCnt = actual + tmpCurfewViolationCnt;
        returnValue = tmpCurfewViolationCnt;
    }
    else if (tmp == "tmpTotalPointsAfterTrip") {
        tmpTotalPointsAfterTrip = actual + tmpTotalPointsAfterTrip;
        returnValue = tmpTotalPointsAfterTrip;
    }
    else if (tmp == "tmpTotalBadgesAfterTrip") {
        tmpTotalBadgesAfterTrip = actual + tmpTotalBadgesAfterTrip;
        returnValue = tmpTotalBadgesAfterTrip;
    }
    else if (tmp == "tmpDistanceCovered") {
        tmpDistanceCovered = actual + tmpDistanceCovered;
        returnValue = tmpDistanceCovered;
    }
    else if (tmp == "tmpSpeedViolationCnt") {
        tmpSpeedViolationCnt = actual + tmpSpeedViolationCnt;
        returnValue = tmpSpeedViolationCnt;
    }
    else if (tmp == "tmpTripPoints") {
        tmpTripPoints = actual + tmpTripPoints;
        returnValue = tmpTripPoints;
    }
    else if (tmp == "tmpBadgesInTrip") {
        tmpBadgesInTrip = actual + tmpBadgesInTrip;
        returnValue = tmpBadgesInTrip;
    }
    else if (tmp == "tmpTotalCredits") {
        tmpTotalCredits = actual + tmpTotalCredits;
        returnValue = tmpTotalCredits;
    }

    return returnValue;
}

function tripSummaryDetails(tmpFirstname) {
    eachJson = [];
    for (var i = 0; i < childArray.length; i++) {
        //console.log(childArray[i].firstName);
        if (childArray[i].firstName == tmpFirstname) {
            eachJson.push(childArray[i]);
        }
    }

}


//fUNCTIONS TO POPULATE TABLES FROM ECLIPSE
function createOperatorTable() {
    $("#dbOperatorTbl").jsonTable(
            {
                head: ['Operator', 'Total Miles', 'Total Points', 'Curfew',
                    'Violations Speed', 'Boundary', 'Manage'],
                json: ['firstName', 'distanceCovered', 'totalPointsAfterTrip', 'curfewViolationCnt',
                    'speedViolationCnt', 'geoFenceViolationCnt', 'dropDown']
            });

    $("#dbOperatorTbl").jsonTableUpdate({
        source: tempSumJson,
        rowClass: "operatorRowClass",
        callback: function() {
        }
    });
    $('.operatorRowClass td:first-child').wrapInner(
            "<a href='#' id='anchorClickTripSummary'><u></u></div>");
}

function commonPopulateDetailsUsingAnchor(e) {
    var thisObj = this;
    $("a#anchorClickTripSummary").click(function(e) {
        // e.preventDefault();
        $('.dynamicThead').remove();
        $('#mapRow').remove();
        $('.operatorRole').val('Select');
        row_index = $(this).closest('td').parent()[0].sectionRowIndex;
        tmpFirstname = tempSumJson[row_index].firstName;
        thisObj.tripSummaryDetails(tmpFirstname);
        thisObj.commonPopulateDetails(e, row_index);
    });
}
;

function commonPopulateDetailsUsingDrpDwn(e) {
    var thisObj = this;
    $("#dbOperatorTbl .operatorRole").on('change', function(e) {
        $('.dynamicThead').remove();
        $('#mapRow').remove();
        row_index = $(this).closest('td').parent()[0].sectionRowIndex;
        tmpFirstname = tempSumJson[row_index].firstName;
        thisObj.tripSummaryDetails(tmpFirstname);
        thisObj.commonPopulateDetails(e, row_index);
    });
}

function commonPopulateDetails(e, row_index) {

    var strMobileNum = eachJson[0].primaryPhoneNumber;
    var strEmailId = eachJson[0].primaryEmailAddress;
    var strReceiveAlertVia = "SMS text, email";
    var strActivationCode = "PX87492G8H";

    htmlThead = ("<tr class='dynamicThead' style=\"background-color: #e4e4e4; font-family: Trebuchet MS; color: #5b5b5b; vertical-align: middle;\"><td class='dynamicThead' colspan=\"7\"><div id=\"infoHeader\" ><p class='childTableHead'>Mobile Phone: "
            + strMobileNum
            + " Email Address: "
            + strEmailId
            + " receiving alerts via: "
            + strReceiveAlertVia
            + "<br>Activation Code : &lt;" + strActivationCode + "&gt;</p></div></td></tr>");
    htmlTable = ("<tr style=\"font-family: Trebuchet MS; color: #5b5b5b; vertical-align: middle;\" id='mapRow'><td colspan=\"6\"><table style=\"border-bottom: 2px solid #5b5b5b;\" id='dynamicdataTable' width='100%'><thead></thead><tbody></tbody></table></td></tr>");
    $('#dbOperatorTbl > tbody > tr:eq(' + row_index + ')').after(htmlThead,
            htmlTable);
    $("#dynamicdataTable").jsonTable({
        head: ['Trips', 'Total Miles', 'Total Points', 'Curfew',
            'Violations Speed', 'Boundary', 'Manage'],
        json: ['tripId', 'distanceCovered', 'totalPointsAfterTrip', 'curfewViolationCnt',
            'speedViolationCnt', 'geoFenceViolationCnt', 'dropDown']
    });

    $("#dynamicdataTable").jsonTableUpdate({
        source: eachJson,
        rowClass: "rowClass",
        callback: function() {
            // $("#mssg").html("Table updated at " + new
            // Date());
        }
    });
}
;


//populating combo box
function populateDateCombobox() {
    var thisObj = this;

    /*
     * Logic For Month
     */
    var strMonth = [];
    var tmpMonth = null;
    var month_names = new Array( );
    month_names[month_names.length] = "January";
    month_names[month_names.length] = "February";
    month_names[month_names.length] = "March";
    month_names[month_names.length] = "April";
    month_names[month_names.length] = "May";
    month_names[month_names.length] = "June";
    month_names[month_names.length] = "July";
    month_names[month_names.length] = "August";
    month_names[month_names.length] = "September";
    month_names[month_names.length] = "October";
    month_names[month_names.length] = "November";
    month_names[month_names.length] = "December";

    var tmpStartDate = new Date();
    var tmpEndDate = new Date();
    var tmpValue = "1384518653/1384519066"
    var tmpOption;

    var date = new Date();
    date.setDate(1);

    //logic to get start and end epoch time  
    tmpStartDate.setDate(1);
    tmpOption = "<option value=" + (Math.round(tmpEndDate.getTime() / 1)) + "/" + (Math.round(tmpStartDate.getTime() / 1)) + ">"
    //logic to get start and end epoch time

    tmpMonth = month_names[date.getMonth()] + " ," + date.getFullYear()
    strMonth.push(tmpOption + tmpMonth);
    console.log(tmpStartDate + "------->" + tmpEndDate)
    for (var i = 0; i < 5; i++) {

        //logic to get start and end epoch time  
        tmpStartDate.setMonth(tmpStartDate.getMonth() - 1);
        tmpEndDate.setDate(0);
        console.log(tmpStartDate + "------->" + tmpEndDate)
        tmpOption = "<option value=" + (Math.round(tmpEndDate.getTime() / 1)) + "/" + (Math.round(tmpStartDate.getTime() / 1)) + ">"
        //logic to get start and end epoch time

        date.setMonth(date.getMonth() - 1);
        tmpMonth = month_names[date.getMonth()] + " ," + date.getFullYear();
        strMonth.push(tmpOption + tmpMonth);
    }
    /*
     * End of Logic For Month
     */


    /*
     * Logic For Week
     */

    var strWeek = [];
    var from = new Date();
    var to = new Date;
    var tmpOption;
    var tmpValue;

    var month_namesfrWeeks = new Array();
    month_namesfrWeeks[month_namesfrWeeks.length] = "Jan";
    month_namesfrWeeks[month_namesfrWeeks.length] = "Feb";
    month_namesfrWeeks[month_namesfrWeeks.length] = "Mar";
    month_namesfrWeeks[month_namesfrWeeks.length] = "Apr";
    month_namesfrWeeks[month_namesfrWeeks.length] = "May";
    month_namesfrWeeks[month_namesfrWeeks.length] = "Jun";
    month_namesfrWeeks[month_namesfrWeeks.length] = "Jul";
    month_namesfrWeeks[month_namesfrWeeks.length] = "Aug";
    month_namesfrWeeks[month_namesfrWeeks.length] = "Sep";
    month_namesfrWeeks[month_namesfrWeeks.length] = "Oct";
    month_namesfrWeeks[month_namesfrWeeks.length] = "Nov";
    month_namesfrWeeks[month_namesfrWeeks.length] = "Dec";

    //no need to change to date
    from.setDate(from.getDate() - 7)

    tmpOption = "<option value=" + from.getTime() + "/" + to.getTime() + ">"
    tmpValue = month_namesfrWeeks[from.getMonth()] + " " + from.getDate() + "-" + month_namesfrWeeks[to.getMonth()] + " " + to.getDate() + "," + to.getFullYear();
    strWeek.push(tmpOption + tmpValue)

    for (var i = 0; i < 6; i++) {
        from.setDate(from.getDate() - 7)
        to.setDate(to.getDate() - 7)


        tmpOption = "<option value=" + from.getTime() + "/" + to.getTime() + ">"
        tmpValue = month_namesfrWeeks[from.getMonth()] + " " + from.getDate() + "-" + month_namesfrWeeks[to.getMonth()] + " " + to.getDate() + "," + to.getFullYear();
        strWeek.push(tmpOption + tmpValue);
    }
    console.log(strWeek)


    /*
     * End Logic For Week
     */

    for (i = 0; i < strWeek.length; i++) {
        $("select#operatorDateCombobox").append(strWeek[i]);
    }
    $("a#dateComboLnk").click(function(e) {
        if ($("a#dateComboLnk").text() == "View Weekly Summary") {
            $("a#dateComboLnk").text("View Monthly Summary");
            $("div#reportLabel.nonHeading").text("Weekly Summary");
            $("select#operatorDateCombobox").empty();
            for (i = 0; i < strWeek.length; i++) {
                $("select#operatorDateCombobox").append(strWeek[i]);
            }
        } else if ($("a#dateComboLnk").text() == "View Monthly Summary") {
            $("a#dateComboLnk").text("View Weekly Summary");
            $("div#reportLabel.nonHeading").text("Monthly Summary");
            $("select#operatorDateCombobox").empty();
            for (i = 0; i < strMonth.length; i++) {
                $("select#operatorDateCombobox").append(strMonth[i]);
            }
        }
    });
}

function getStartAndEndTime(tmpStartDate, tmpEndDate) {
    var time = new function() {

    }
    return time;
}

function epochToHumanDate(epochTime) {

    var myDateEpochToHuman = new Date(epochTime * 1000);
    Month = myDateEpochToHuman.toLocaleString("en-us", {month: "long"});
    Year = myDateEpochToHuman.toLocaleString("en-us", {year: "numeric"});
    Day = myDateEpochToHuman.toLocaleString("en-us", {day: "2-digit"});

    dateFormat = Month + " " + Day + ", " + Year;

    return dateFormat;

}
;

function humanToEpochDate(month, year) {

    if (month != "" && year != "") {
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        dateFormat = months[parseInt(month - 1)] + " 1, " + year + " 00:00:00";

        var myDateHumanToEpoch = new Date(dateFormat);
        var myEpoch = myDateHumanToEpoch.getTime() / 1000.0;
        return myEpoch;
    }
    return null;
}
;


