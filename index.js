import input from './data/input';

doSmart(input);

function doSmart(input) {
    checkInput(input);

    const DAY_LENGTH    = 24,
          DAY_MODE      = 'day',
          DAY_START     = 7,
          DAY_END       = 21,
          NIGHT_MODE    = 'night',
          NIGHT_START   = 21,
          NIGHT_END     = 7,
          KILOWATT      = 1000,
          ROUND_TO      = 10000;

    let output = {
            schedule: {},
            consumedEnergy: {
                value: 0,
                devices: {}
            }
        },
        devices  = input.devices,
        rates    = input.rates,
        maxPower = input.maxPower,
        dayPower = getDayPower(maxPower),
        dayTarif = getDayTarif(rates);

    sortDevices(devices);

    for (let i = 0; i < devices.length; i ++) {
        let spendBest    = NaN, 
            dayPowerBest = dayPower.slice(0, dayPower.length), 
            scheduleBest = {},
            start        = 0,
            end          = DAY_LENGTH,
            dayLength;

        if (devices[i].mode == DAY_MODE) {
            start = DAY_START;
            end = DAY_END;
        } else if (devices[i].mode == NIGHT_MODE) {
            start = NIGHT_START;
            end = NIGHT_END;
        }

        if (start <= end) {
            dayLength = end - start;
        } else if (start > end) {
            dayLength = DAY_LENGTH - start + end;
        }

        if (devices[i].mode == NIGHT_MODE || devices[i].mode == DAY_MODE) {
            dayLength -= devices[i].duration;
        }

        for (let hour = start; dayLength > 0; hour ++, dayLength --) {
            let state      = dayPower.slice(0, dayPower.length),
                schedule   = {},
                spend      = 0,
                isPossible = true;

            if (hour == DAY_LENGTH) {
                hour = 0;
            }

            for (let curHour = hour, iteration = 0; iteration < devices[i].duration; curHour ++, iteration ++) {
                if (curHour == DAY_LENGTH) {
                    curHour = 0;
                }

                spend += dayTarif[curHour] * devices[i].power / KILOWATT;

                if ( (state[curHour] - devices[i].power < 0) ) {
                    isPossible = false;
                    break;
                }

                state[curHour] -= devices[i].power;
                schedule[curHour] = devices[i].id;
            }

            if (isPossible) {
                if (isNaN(spendBest) || spend < spendBest) {
                    spendBest = spend;
                    dayPowerBest = state.slice(0, state.length);
                    scheduleBest = {};

                    for (let hour in schedule) {
                        scheduleBest[hour] = schedule[hour];
                    }
                }
            }
        }

        if (isNaN(spendBest))
            throw Error('NaN error');

        dayPower = dayPowerBest.slice(0, dayPowerBest.length);
        output.consumedEnergy.value += spendBest;
        spendBest = Math.round(spendBest * ROUND_TO) / ROUND_TO;
        output.consumedEnergy.devices[devices[i].id] = spendBest;

        for (let hour in scheduleBest) {
            if (typeof output.schedule[hour] == 'undefined') {
                output.schedule[hour] = [];
            }

            output.schedule[hour].push(scheduleBest[hour]);
        }
    }

    output.consumedEnergy.value = Math.round(output.consumedEnergy.value * ROUND_TO) / ROUND_TO;
    console.log(output);
    return output;

    function getDayPower(maxPower) {
        let day = [];
        for (let i = 0; i < DAY_LENGTH; i ++) {
            day[i] = maxPower;
        }

        return day;
    }

    function getDayTarif(rates) {
        let tarif = [];
        for (let i = 0; i < DAY_LENGTH; i ++) {
            tarif[i] = getTarifByHour(i, rates);
        }

        return tarif;
    }

    function getTarifByHour(hour, rates)  {
        for (let i = 0; i < rates.length; i ++) {
            if (rates[i].from < rates[i].to) {
                if (hour >= rates[i].from && hour < rates[i].to) {
                    return rates[i].value;
                }
            } else if (rates[i].from > rates[i].to) {
                if (hour >= rates[i].from || hour < rates[i].to)
                    return rates[i].value;
            } else if (rates[i].from == rates[i].to && rates[i].from == hour) {
                    return rates[i].value;
            }
        }

        return 0;
    }

    function sortDevices(devices) {
        for (let i = 0; i < devices.length; i ++) {
            for (let j = i + 1; j < devices.length; j ++) {
                if (devices[i].duration < devices[j].duration) {
                    let tmp = devices[i];
                    devices[i] = devices[j];
                    devices[j] = tmp;
                }
            }
        }
    }

    function checkInput(input) {
        for (let i = 0; i < input.devices.length; i ++) {
            if (
                input.devices[i].duration < 0 
                || typeof input.devices[i].duration == 'undefined'
                || input.devices[i].power < 0
                || typeof input.devices[i].power == 'undefined'
                || typeof input.devices[i].name == 'undefined'
                || typeof input.devices[i].id == 'undefined'
            ) {
                throw Error('devices input error');
            }
        }

        for (let i = 0; i < input.rates.length; i ++) {
            if (
                input.rates[i].from < 0 
                || typeof input.rates[i].from == 'undefined'
                || input.rates[i].to < 0
                || typeof input.rates[i].to == 'undefined'
                || typeof input.rates[i].value == 'undefined'
            ) {
                throw Error('rates input error');
            }
        }
        if (typeof input.maxPower == 'undefined') {
                throw Error('rates input error');
            }
    }
}