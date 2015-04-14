/**
 * Created by David Verdú on 09/04/15.
 */
'use strict';

var FixtureHelper = function(options) {
    this.options = options;
}

FixtureHelper.prototype.generate_sector_industry_filters_fixtures = function(info) {
    var fixtures = [];
    var info = info || {};
    var pattern_type_map = { 'stocks': 0, 'pairs': 1, 'indices': 0, 'indices_pairs': 1, 'futures': 0 };
    var type = info.type || 'stocks';
    var pattern_type = pattern_type_map[type] || 0;
    var months = info.months || [201411];
    var pack_code = info.pack_code || 'USA-S-1';
    var free_pack = info.free_pack || false;
    var region_code = info.region_code || 'USA';
    var exchange_symbol = info.exchange_symbol || 'EX1';
    var first_sector_id = info.first_sector_id || 1;
    var first_industry_id = info.first_industry_id || 1;
    var values = info.values || [];

    var sector_id = first_sector_id;
    var industry_id = first_industry_id;

    for (var i=0; i<months.length; i++) {
        for (var j=0; j<values.length; j++) {
            var current_month = months[i];
            var current_value = values[j];
            var industries = current_value.industries || [];
            
            //generate sector filter for this month
            var sector_filter_fixture = {
                type: 'insert',
                table: 'sector_filter',
                values: {
                    id: sector_id,
                    free_pack: free_pack,
                    pack_code: pack_code,
                    region_code: region_code,
                    month: current_month,
                    exchange_symbol: exchange_symbol,
                    name: current_value.name,
                    pattern_type: pattern_type
                }
            };
            fixtures = fixtures.concat(sector_filter_fixture);
            
            //generate its industries filters
            for (var k=0; k<industries.length; k++) {
                var industry = industries[k];
                var industry_filter_fixture = {
                    type: 'insert',
                    table: 'industry_filter',
                    values: {
                        id: industry_id++,
                        sector_filter_id: sector_id,
                        name: industry

                    }
                };
                fixtures = fixtures.concat(industry_filter_fixture);
            }

            sector_id++; //increment sector id
        }
    }

    return fixtures;
}

FixtureHelper.prototype.generate_asset_fixture = function(info) {
    var id = (info.id || '1') + '';
    var symbol = "ASSET" + id;
    var short_name = 'Asset ' + id.split("_").join(" ");
    var long_name = 'Long name Asset ' + id.split("_").join(" ");
    var last_quote = info.last_quote || 10;
    var last_quote_date = info.last_quote_date || '2014-10-30';
    var volatility = info.volatility || 19.20;
    var exchange_symbol = info.exchange_symbol || 'EX1';
    var sector = info.sector || 'sector1 SECTOR CD';
    var industry = info.industry || 'industry1 CD';
    var expiration_year = info.expiration_year || null;
    var expiration_month = info.expiration_month || null;
    var fixture = {
        type: 'insert',
        table: 'asset',
        values: {
            asset_disc: 1,
            symbol: symbol,
            short_name: short_name,
            long_name: long_name,
            last_quote: last_quote,
            last_quote_date: last_quote_date,
            price_chart_url: 'www.urlPriceChart.com',
            volatility: volatility,
            exchange_symbol: exchange_symbol,
            sector: sector,
            industry: industry,
            expiration_year: expiration_year,
            expiration_month: expiration_month,
            volatility_chart_url: 'www.urlVolatChart.com'
        }
    };
    return fixture;
}

FixtureHelper.prototype.generate_pattern_and_its_assets_fixtures = function(info,options) {
    var info = info || {};
    var options = options || {};
    var fixtures = [];
    var pattern_disc_map = { 'stocks': 1, 'pairs': 2, 'indices': 1, 'indices_pairs': 2, 'futures': 1 };
    var product_type_map = { 'stocks': 0, 'pairs': 0, 'indices': 1, 'indices_pairs': 1, 'futures': 2 };
    var type = info.type || 'stocks';
    var pack_code = info.pack_code || 'USA-S-1';
    var pattern_id = info.id || 1;
    var bearish_asset_symbol = null;
    var bearish_asset_id = null;
    var asset_id = '' + (info.asset_id || pattern_id);
    var asset_id_digits = info.asset_id_digits || 0;
    if (asset_id_digits && asset_id.length < asset_id_digits) {
       asset_id = Array(asset_id_digits - asset_id.length + 1).join("0") + asset_id;          
    }
    var include_pair = ((type == 'pairs' || type == 'indices_pairs') ? true : false);
    if (include_pair) {
        bearish_asset_id = asset_id + '_2';
        bearish_asset_symbol = "ASSET" + bearish_asset_id;
        asset_id += '_1';
    }
    var asset_symbol = 'ASSET' + asset_id;
    var reverse_pair_assets = info.reverse_pair_assets || 0;
    if (include_pair && reverse_pair_assets) {
       var tmp = asset_symbol;
       asset_symbol = bearish_asset_symbol;
       bearish_asset_symbol = tmp;
    }
    var volatility = info.volatility || 19.20;
    var exchange_symbol = info.exchange_symbol || 'EX1';
    var sector = info.sector || 'sector1';
    var industry = info.industry || 'industry1';

    var entry_date = info.entry_date || '2014-11-01';
    var exit_date = info.exit_date || '2014-12-15';
    var win = info.win || 14;
    var loss = info.loss || 1;
    var pattern_type = info.pattern_type || 0; //sell or buy
    var accumulated_return = info.accumulated_return || 212.33;
    var average_return = info.average_return || 14.16;
    var daily_return = info.daily_return || 0.08;
    var entry_value = info.entry_value || null;
    var effective_entry_date = info.effective_entry_date || entry_date;
    var exit_value = info.exit_value || null;
    var effective_exit_date = info.effective_exit_date || exit_date;
    var duration = info.duration || 45;
    var best_gain = info.best_gain || null;
    var best_gain_date = info.best_gain_date || '2014-11-21';
    var worst_loss = info.worst_loss || null;
    var worst_loss_date = info.worst_loss_date || '2014-11-03';
    var last_performance = info.last_performance || null;
    var drawdown = info.drawdown || -27.31;
    var winning_years_mean_rent = info.winning_years_mean_rent || 220.41;
    var losing_years_mean_rent = info.losing_years_mean_rent || -8.08;
    var product_type = product_type_map[type] || 0; 
    //pair attributes
    var bearish_average_return = (include_pair ? (info.bearish_average_return || 1) : null);
    var bullish_average_return = (include_pair ? (info.bullish_average_return || 2) : null);
    var bearish_entry_value = (include_pair ? (info.bearish_entry_value || 11) : null);
    var bearish_exit_value = (include_pair ? (info.bearish_exit_value || 22) : null);
    var daily_pair_return = (include_pair ? (info.daily_pair_return || 12.13) : null);
    var pair_volatility = (include_pair ? (info.pair_volatility || info.volatility || 23) : null);
    var last_performance_date = (include_pair ? (info.last_performance_date || '2014-11-19') : null);
    var bullish_average_win = (include_pair ? (info.bullish_average_win || 14) : null);
    var bullish_average_loss = (include_pair ? (info.bullish_average_loss || 1) : null);
    var bearish_average_win = (include_pair ? (info.bearish_average_win || 13) : null);
    var bearish_average_loss = (include_pair ? (info.bearish_average_loss || 2) : null);

    //create related assets
    if (true) {
        var asset1_data = {
            id: asset_id, volatility: volatility, exchange_symbol: exchange_symbol,
            sector: sector, industry: industry
        };
        var asset1_fixture = this.generate_asset_fixture(asset1_data);
        fixtures.push(asset1_fixture);
        if (type == 'pairs' || type == 'indices_pairs') {
            var asset2_data = {
                id: bearish_asset_id, volatility: volatility, exchange_symbol: exchange_symbol,
                sector: sector, industry: industry
            };
            var asset2_fixture = this.generate_asset_fixture(asset2_data);
            fixtures.push(asset2_fixture);
        }
    }

    var pattern_fixture = {
        type: 'insert',
        table: 'pattern',
        values: {
            pattern_disc: pattern_disc_map[type] || 1, //simple(1) or pair(2)
            id: pattern_id,
            pack_code: pack_code,
            pattern_type: pattern_type, //sell or buy
            win: win,
            loss: loss,
            asset_symbol: asset_symbol,
            entry_date: entry_date,
            exit_date: exit_date,
            accumulated_return: accumulated_return,
            average_return: average_return,
            daily_return: daily_return,
            entry_value: entry_value,
            effective_entry_date: effective_entry_date,
            exit_value: exit_value,
            effective_exit_date: effective_exit_date,
            pattern_close_chart_url: 'www.chartUrl1.com',
            pattern_six_years_chart_url:'www.sixYearsChartUrl',
            week_trend_chart_url:'www.chartWeekUrl',
            month_trend_chart_url:'monthTrendUrl',
            duration: duration,
            best_gain: best_gain,
            best_gain_date: best_gain_date,
            worst_loss: worst_loss,
            worst_loss_date: worst_loss_date,
            last_performance: last_performance,
            bearish_asset_symbol: bearish_asset_symbol, //pair asset
            bearish_average_return: bearish_average_return, 
            bullish_average_return: bullish_average_return,
            bearish_entry_value: bearish_entry_value,
            bearish_exit_value: bearish_exit_value,
            daily_pair_return: daily_pair_return,
            pair_volatility: pair_volatility, //only in pairs
            last_performance_date: last_performance_date,
            drawdown: drawdown,
            winning_years_mean_rent: winning_years_mean_rent,
            losing_years_mean_rent: losing_years_mean_rent,
            product_type: product_type,
            bullish_average_win: bullish_average_win,
            bullish_average_loss: bullish_average_loss,
            bearish_average_win: bearish_average_win,
            bearish_average_loss: bearish_average_loss
        }
    };

    fixtures.push(pattern_fixture);

    return fixtures;
}

FixtureHelper.prototype.generate_patterns_and_assets_fixtures = function(info,options) {
    var fixtures = [];
    var info = info || {};
    var first_id = info.first_id || 1;
    var first_asset_id = info.first_asset_id || first_id;
    var quantity = info.quantity || 1;
    var type = info.type || 'stocks';
    var pack_code = info.pack_code || 'USA-S-1';
    var entry_dates = info.entry_dates || ['2014-11-01'];
    var exit_dates = info.exit_dates || ['2014-12-15'];
    var durations = info.durations || [45];
    var wins = info.wins || [14];
    var losses = info.losses || [1];
    var volatilities = info.volatilities || [19.20];
    var accumulated_returns = info.accumulated_returns || [212.33];
    var average_returns = info.average_returns || [14.16];
    var exchange_symbols = info.exchange_symbols || ['EX1'];
    var sectors = info.sectors || ['sector1'];
    var industries = info.industries || ['industry1'];
    var reverse_pair_assets = info.reverse_pair_assets || false;
    var asset_id_digits = info.asset_id_digits || 0;

    for (var i = 0; i < quantity; i++) {
        var params = { id: first_id + i, 
                       asset_id: first_asset_id + i,
                       asset_id_digits: asset_id_digits,
                       reverse_pair_assets: reverse_pair_assets,
                       pack_code: pack_code,
                       type: type
        };
        params.entry_date = entry_dates[i%entry_dates.length];
        params.exit_date = exit_dates[i%exit_dates.length];
        params.duration = durations[i%durations.length];
        params.win = wins[i%wins.length];
        params.loss = losses[i%losses.length];
        params.volatility = volatilities[i%volatilities.length];
        params.accumulated_return = accumulated_returns[i%accumulated_returns.length];
        params.average_return = average_returns[i%average_returns.length];
        params.exchange_symbol = exchange_symbols[i%exchange_symbols.length];
        params.sector = sectors[i%sectors.length];
        params.industry = industries[i%industries.length];

        var iter_fixtures = this.generate_pattern_and_its_assets_fixtures(params);
        fixtures = fixtures.concat(iter_fixtures);
    }

    return fixtures
}

FixtureHelper.prototype.generate_pack_fixtures = function(info,options) {
    var info = info || [];
    var options = options || {};
    var product_type_map = { 'stocks': 0, 'pairs': 0, 'indices': 1, 'indices_pairs': 1, 'futures': 2 };
    var pattern_type_map = { 'stocks': 0, 'pairs': 1, 'indices': 0, 'indices_pairs': 1, 'futures': 0 };
    var published_packs_months = options.published_packs_months || [];
    var fixtures = [];
    
    for (var i=0; i<info.length; i++) {
        var item = info[i];

        //generate pack fixture
        var type = item.type || options.default_pack_type || 'stocks';
        var product_type = product_type_map[type] || 0;
        var pattern_type = pattern_type_map[type] || 0;
        var publication_date = item.publication_date || options.default_publication_date || '2014-09-15';
        var subname = item.subname || options.default_subname || ' '; 
        var pack_fixture = {
            type: 'insert',
            table: 'pack',
            values: {
                code: item.code,
                region_code: item.region_code,
                name: item.name,
                product_type: product_type,
                publication_date: publication_date,
                scope_text: item.scope_text,
                pattern_type: pattern_type,
                subname: subname                                
            }
        };
        fixtures.push(pack_fixture); //add pack fixture to array of fixtures
        
        var num_patterns = item.num_patterns || options.default_num_patterns || 50;
        var letter_from = item.letter_from || options.default_letter_from || 'aaa';
        var letter_until = item.letter_until || options.default_letter_until || 'zzz';

        //generate published_packs fixtures when required
        if (options.create_published_packs && published_packs_months.length > 0) {
            for (var j=0; j<published_packs_months.length; j++) {
                var month = published_packs_months[j];
                var published_packs_fixture = {
                    type: 'insert',
                    table: 'published_packs',
                    values: {
                        pack_code: item.code,
                        pack_month: month,
                        publication_date: publication_date,
                        num_patterns: num_patterns,
                        letter_from: letter_from,
                        letter_until: letter_until                        
                    }
                };
                fixtures.push(published_packs_fixture); //add published pack to array of fixtures
            }
        }
    }
    
    return fixtures;
}

exports.FixtureHelper = FixtureHelper;
