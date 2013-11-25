//variables to help in array creation
var childArray = [];
var tempSumJson = [];
var eachJson = [];
var compOperatorId = null;
var tempTripSummary;

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
    //console.log("will Start test now");
    childArray = callParentService();
    console.log(JSON.stringify(childArray));
    //console.log("Completed Test");
    //console.log("call trip summary");
    tripSummary();
    tripSummaryDetails();
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
    console.log(JSON.stringify(tempSumJson));   //output for SUM Json
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

var name = "henry"
function tripSummaryDetails() {
    for (var i = 0; i < childArray.length; i++) {
        //console.log(childArray[i].firstName);
        if(childArray[i].firstName == "kate"){
            eachJson.push(childArray[i]);
        }
    }
     console.log(JSON.stringify(eachJson));
}