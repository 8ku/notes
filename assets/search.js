$(document).ready(function () {
    $("#search").on("input", function () {
        var searchVal = $(this).val().toLowerCase();
        var $results = $("#search-results");
        $results.empty();

        if (searchVal === "") {
            // Show original content, hide results
            $(".con").show();
            $results.hide();
            return;
        }

        // Hide original content
        $(".con").hide();

        // Collect matches, grouped by parent div
        var html = "";
        $(".con > div").each(function () {
            var $div = $(this);
            var $h2 = $div.find("h2").first();
            var $ol = $div.find("ol").first();
            var matchedLis = [];

            $ol.find("li").each(function () {
                if ($(this).text().toLowerCase().indexOf(searchVal) !== -1) {
                    matchedLis.push($(this).clone());
                }
            });

            if (matchedLis.length > 0) {
                // Build a new div with h2 and only matched lis
                var $newDiv = $("<div></div>");
                $newDiv.append($h2.clone());
                var $newOl = $("<ol></ol>");
                matchedLis.forEach(function ($li) {
                    $newOl.append($li);
                });
                $newDiv.append($newOl);
                html += $newDiv.prop("outerHTML");
            }
        });

        if (html === "") {
            $results.html("<p>No results found.</p>").show();
        } else {
            $results.html(html).show();
        }
    });
});