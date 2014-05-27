/**
 * 
 * @description ioki recruitment task
 * @author Wojciech Dasiukiewicz <wojciech.dasiukiewicz@gmail.com>, <www.ninjacode.pl>
 *
 * */

var data;
var pageMin = 0;
var pageMax = 1;
var page = 0;
/** 
 * Function is runing when document is all ready
 * */
$(document).ready(function() {
    init();
});
/**
 * Init function prepare app to work
 * */
function init() {
    $("#app").load("app/views/layout.html", function() {
        loadPage();
        $('#checkOutButton').click(function() {
            $(this).hide();
            $("#resetButton").show();
            $('input').each(function(index) {
                if ($(this).attr('disabled') != "disabled") {
                    if ($(this).val().toLowerCase() != data[index].value) {
                        validateFalse($(this));
                    } else {
                        validateTrue($(this));
                    }
                }
            });
        });
        $('#resetButton').click(function() {
            $(this).hide();
            $('#checkOutButton').show();
            $('input').each(function(index) {
                $(this).val('').removeAttr('disabled');
                $(this).parent().find('span').removeClass('false').removeClass('true');
            });
        });
        $('#nextButton').click(function() {
            page++;
            if (page <= pageMax) {
                loadPage();
            } else {
                page--;
            }
        });
        $('#prevButton').click(function() {
            page--;
            if (page >= pageMin) {
                loadPage();
            } else {
                page++;
            }
        });
    });
}
/**
 * Function loads page
 * */
function loadPage() {
    $("#content,#buttonSection").animate({opacity: 0}, 300, function() {
        $("#page-inner").load("app/views/pages/page-" + page + ".html", function() {
            $("#timeLine").removeAttr('class').addClass('step' + page);
            $("head").find("link").last().remove();
            $("head").append("<link rel='stylesheet' href='app/css/pages/page-" + page + ".css'/>");
            $('#content,#buttonSection').animate({opacity: 1}, 300);
            loadData();
            $("input").keydown(function(e) {
                if (e.keyCode == 32) {
                    $(this).val($(this).val()); 
                    return false;
                }
            });
        });
    });
}
/**
 * Function loads data of current page
 * */
function loadData() {
    $.getJSON("app/data/screens.json", function(result) {
        data = result[page];
    });
}
/**
 * Function shows success icons and blocks input
 * */
function validateTrue(input) {
    input.attr('disabled', 'disabled');
    input.parent().find('span').addClass('true');
}
/***
 * Function shows error icons and blocks input
 */
function validateFalse(input) {
    input.attr('disabled', 'disabled');
    input.parent().find('span').addClass('false');
}