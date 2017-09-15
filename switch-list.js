/*
    This version builds a list for each platform. It runs phantom several times to do this. Phantom is slow. This is slow.
*/

var page = require('webpage').create();
page.onConsoleMessage = function (msg) {
  console.log(msg);
};

// PC LIST
page.open('https://www.gamefaqs.com/search_advanced', function(status) {
    if(status !== "success") {
        console.log('Unable to access network');
    }
    else {
        page.includeJs("//ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
            page.evaluate(function() {
                /* Dates, yay! */
                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth()+1; //January is 0!
                var mmNext = today.getMonth()+2;
                var yyyy = today.getFullYear();

                if(dd < 10) { dd = '0'+dd }
                if(mm < 10) { mm = '0'+mm }

                today = yyyy + '-' + mm + '-' + dd;

                if(mmNext == 13) {
                    mmNext = '01';
                    yyyy++;
                }
                var monthLater = yyyy + '-' + mmNext + '-' + dd;

                /* Page automation to select release dates from today through one month from now. Why do I do some of this with jquery and some without? ask phantomjs. */
                document.getElementById("add_date_sel").click();
                $('#date_type').val(4);
                document.querySelector('#date_type').dispatchEvent(new Event('change', { 'bubbles': true}));
                $('#date_1').val(today);
                $('#date_2').val(monthLater);
                document.getElementById("add_platform_sel").click();
                $('#platform').val(124);
                document.querySelector('#platform').dispatchEvent(new Event('change', { 'bubbles': true}));
                $('#search_advanced_form').submit();
            });
            window.setTimeout(function() {
                buildList(page.content);
                phantom.exit();
            }, 2500);
        });
    }
});

/* free at last */
function buildList(dom) {
    //regex for desired lines
    var platforms = (dom.match(/(sr_platform)(.*)(\n)/g) || []);
    var titles = (dom.match(/(sr_title)(.*)(\n)/g) || []);
    var releases = (dom.match(/(sr_release)(.*)(\n)/g) || []);
    var fullList = [];

    //removes table headers
    platforms.splice(0,1);
    titles.splice(0,2);
    releases.splice(0,1);

    //compiles list
    for(var i = 0; i < platforms.length; i++) {
        platforms[i] = platforms[i].split(">")[1].split("<")[0];
        titles[i] = titles[i].split(">")[2].split("<")[0];
        releases[i] = releases[i].split(">")[1].split("<")[0];

        fullList.push([platforms[i], titles[i], releases[i]]);
    }

    //outputs list
    console.log("# Upcoming Switch Releases\n");
    console.log("|Platform|Title|Release|");
    console.log("|:---:|:---:|:---:|")
    fullList.forEach(function(el) {
        el = el.toString().split(",");
        console.log(el[0] + "|" + el[1] + "|" + el[2]);
    });
}
