
$(document).ready(function() {
    // Function to load content
    function loadContent(tab) {
        if (tab === 'article4') {
            // Use fetch for article4 to demonstrate AJAX request
            fetch('http://localhost:4000/article4')
                .then(response => response.text())
                .then(data => {
                    $("#content").html(data);
                    // Initialize tooltips
                    $('[data-bs-toggle="tooltip"]').tooltip();
                })
                .catch(error => {
                    console.error('Error loading content:', error);
                    $("#content").html('<p>Error loading content.</p>');
                });
        } 
        else {
            // Use jQuery's load method for other tabs
            $("#content").load(tab + ".html #content", function() {
                // Initialize tooltips
                $('[data-bs-toggle="tooltip"]').tooltip();

                if(tab === 'article3'){
                    initializeCalculator();
                }
            });
        }
    }

    

    function initializeCalculator() {
        $('#calculatorForm').on('submit', function(event) {
            event.preventDefault();

            // Get form values
            var quality = parseInt($('#quality').val());
            var time = parseInt($('#time').val());

            // Calculate price (example: price = quality * time * 10)
            var price = quality * time * 10;

            // Display result
            $('#calculatorResult').html('<h3>Calculated Price: $' + price + '</h3>');

            // Draw the chart
            drawPriceChart(quality, time, price);

            function drawPriceChart(quality, time, price) {
                var data = google.visualization.arrayToDataTable([
                    ['Factor', 'Value'],
                    ['Quality', quality],
                    ['Time', time],
                    ['Price', price]
                ]);
    
                var options = {
                    title: 'Service Pricing Breakdown',
                    hAxis: {
                        title: 'Factor',
                        minValue: 0
                    },
                    vAxis: {
                        title: 'Value',
                        minValue: 0
                    },
                    legend: 'none'
                };
    
                var chart = new google.visualization.ColumnChart(document.getElementById('price_chart'));
                chart.draw(data, options);
            }
        });
    }

    function runscript(articleNumber) {
        google.charts.load('current', {'packages':['corechart']});
    
        if (articleNumber === 2) {
            $.getJSON('article2_data.json', function(data) {
                drawMarketCapChart(data.marketCap);
                drawTransactionVolumeChart(data.transactionVolume);
                drawPriceFluctuationChart(data.priceFluctuation);
                drawMarketShareChart(data.marketShare);
            });
        } else if (articleNumber === 3) {
            google.charts.load('current', {'packages':['corechart']});
        }
    
        function drawMarketCapChart(marketCapData) {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Year');
            data.addColumn('number', 'Bitcoin');
            data.addColumn('number', 'Ethereum');
            data.addColumn('number', 'Ripple');
    
            marketCapData.forEach(function(row) {
                data.addRow([row.year, row.Bitcoin, row.Ethereum, row.Ripple]);
            });
    
            var options = {
                title: 'Cryptocurrency Market Capitalization',
                curveType: 'function',
                legend: { position: 'bottom' }
            };
    
            var chart = new google.visualization.LineChart(document.getElementById('market_cap_chart'));
            chart.draw(data, options);
        }
    
        function drawTransactionVolumeChart(transactionVolumeData) {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Month');
            data.addColumn('number', 'Bitcoin');
            data.addColumn('number', 'Ethereum');
    
            transactionVolumeData.forEach(function(row) {
                data.addRow([row.month, row.Bitcoin, row.Ethereum]);
            });
    
            var options = {
                title: 'Monthly Transaction Volume',
                bar: { groupWidth: '75%' },
                legend: { position: 'bottom' }
            };
    
            var chart = new google.visualization.ColumnChart(document.getElementById('transaction_volume_chart'));
            chart.draw(data, options);
        }
    
        function drawPriceFluctuationChart(priceFluctuationData) {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Time');
            data.addColumn('number', 'Bitcoin');
    
            priceFluctuationData.forEach(function(row) {
                data.addRow([row.time, row.Bitcoin]);
            });
    
            var options = {
                title: 'Bitcoin Price Fluctuations Over Time',
                hAxis: { title: 'Time of Day' },
                vAxis: { title: 'Price in USD' },
                legend: 'none'
            };
    
            var chart = new google.visualization.LineChart(document.getElementById('price_fluctuation_chart'));
            chart.draw(data, options);
        }
    
        function drawMarketShareChart(marketShareData) {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Currency');
            data.addColumn('number', 'Market Share');
    
            marketShareData.forEach(function(row) {
                data.addRow([row.currency, row.share]);
            });
    
            var options = {
                title: 'Cryptocurrency Market Share',
                pieHole: 0.4,
                legend: { position: 'bottom' }
            };
    
            var chart = new google.visualization.PieChart(document.getElementById('market_share_chart'));
            chart.draw(data, options);
        }
        
        
    }
    


    // Initial load
    loadContent("portfolio");

    // Handle tab clicks
    $("#professionalTabs .nav-link").on("click", function(event) {
        event.preventDefault();
        var tab = $(this).data("tab");
        if (tab) {
            loadContent(tab);
            $("#professionalTabs .nav-link").removeClass("active");
            $(this).addClass("active");
            runscript();
 
        }
    });

    // Handle dropdown item clicks
    $(".dropdown-item").on("click", function(event) {
        event.preventDefault();
        var tab = $(this).data("tab");
        if (tab) {
            loadContent(tab);
            if(tab === 'article2') {
                runscript(2);
            } else if(tab === 'article3') {
                runscript(3);
            }
            $("#professionalTabs .nav-link").removeClass("active");
            $('#articlesDropdown').addClass("active");
            
        }
    });
});   

document.getElementById('redirectButton').addEventListener('click', function() {
    window.location.href = 'http://localhost:3000'; // Change this URL as needed
});
