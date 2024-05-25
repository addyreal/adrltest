document.addEventListener('DOMContentLoaded', function () {
    const calendarContainer = document.getElementById('calendar');
    const currentDate = new Date();
  
    function generateCalendar(year, month) {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const daysOfWeek = ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'];
        const monthsInCzech = ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'];
  
        let calendarHTML = '<div id="calendar-button-container"><button class="calendar-button" id="prevMonthBtn">&lt;</button><button class="calendar-button" id="nextMonthBtn">&gt;</button></div>';
        calendarHTML += '<h2>' + monthsInCzech[firstDay.getMonth()] + ' ' + firstDay.getFullYear() + '</h2>';
        calendarHTML += '<table><thead><tr>';
  
        for (const day of daysOfWeek) {
            calendarHTML += '<th>' + day + '</th>';
        }
  
        calendarHTML += '</tr></thead><tbody>';
  
        let startingDay = (firstDay.getDay() - 1 + 7) % 7;
        let dayCounter = 1;
  
        for (let i = 0; i < 6; i++) {
            calendarHTML += '<tr>';
            for (let j = 0; j < 7; j++) {
                const dateKey = formatDate(year, month, dayCounter);
                const isSpecialDate = specialDates[dateKey];
  
                if (i === 0 && j < startingDay) {
                    calendarHTML += '<td></td>';
                } else if (dayCounter > daysInMonth) {
                    calendarHTML += '<td></td>';
                } else {
                    const cellStyle = isSpecialDate ? 'title="' + specialDates[dateKey].title + '"' + 'class="' + specialDates[dateKey].class + '"' : '';
                    const anchorBef = isSpecialDate ? '<a href="' + specialDates[dateKey].link + '">' : '';
                    const anchorAft = isSpecialDate ? '</a>' : '';
  
                    calendarHTML += '<td ' + cellStyle + ' ' + '>' + anchorBef + dayCounter + anchorAft + '</td>';
                    dayCounter++;
                }
            }
            calendarHTML += '</tr>';
        }
  
        calendarHTML += '</tbody></table>';
        calendarContainer.innerHTML = calendarHTML;
  
        const prevMonthButton = document.getElementById('prevMonthBtn');
        const nextMonthButton = document.getElementById('nextMonthBtn');
  
        //month buttons
        prevMonthButton.addEventListener('click', function () {
            currentDate.setMonth(currentDate.getMonth() - 1);
            updateCalendar();
        });
  
        nextMonthButton.addEventListener('click', function () {
            currentDate.setMonth(currentDate.getMonth() + 1);
            updateCalendar();
        });
    }
  
    function updateCalendar() {
        generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
    }
  
    const specialDates = {
        '2023-12-23': { class: 'preruseni', link: 'informace.html#preruseniprovozu', title: 'Přerušení provozu' },
        '2023-12-24': { class: 'preruseni', link: 'informace.html#preruseniprovozu', title: 'Přerušení provozu' },
        '2023-12-25': { class: 'preruseni', link: 'informace.html#preruseniprovozu', title: 'Přerušení provozu' },
        '2023-12-26': { class: 'preruseni', link: 'informace.html#preruseniprovozu', title: 'Přerušení provozu' },
        '2023-12-27': { class: 'preruseni', link: 'informace.html#preruseniprovozu', title: 'Přerušení provozu' },
        '2023-12-28': { class: 'preruseni', link: 'informace.html#preruseniprovozu', title: 'Přerušení provozu' },
        '2023-12-29': { class: 'preruseni', link: 'informace.html#preruseniprovozu', title: 'Přerušení provozu' },
        '2023-12-30': { class: 'preruseni', link: 'informace.html#preruseniprovozu', title: 'Přerušení provozu' },
        '2023-12-31': { class: 'preruseni', link: 'informace.html#preruseniprovozu', title: 'Přerušení provozu' },
        '2024-01-01': { class: 'preruseni', link: 'informace.html#preruseniprovozu', title: 'Přerušení provozu' },
        '2024-01-02': { class: 'preruseni', link: 'informace.html#preruseniprovozu', title: 'Přerušení provozu' },

        '2024-08-05': { class: 'preruseni', link: 'informace.html#preruseniprovozu', title: 'Přerušení provozu' },
        '2024-08-06': { class: 'preruseni', link: 'informace.html#preruseniprovozu', title: 'Přerušení provozu' },
        '2024-08-07': { class: 'preruseni', link: 'informace.html#preruseniprovozu', title: 'Přerušení provozu' },
        '2024-08-08': { class: 'preruseni', link: 'informace.html#preruseniprovozu', title: 'Přerušení provozu' },
        '2024-08-09': { class: 'preruseni', link: 'informace.html#preruseniprovozu', title: 'Přerušení provozu' },
        '2024-08-10': { class: 'preruseni', link: 'informace.html#preruseniprovozu', title: 'Přerušení provozu' },
        '2024-08-11': { class: 'preruseni', link: 'informace.html#preruseniprovozu', title: 'Přerušení provozu' },
        '2024-08-12': { class: 'preruseni', link: 'informace.html#preruseniprovozu', title: 'Přerušení provozu' },
        '2024-08-13': { class: 'preruseni', link: 'informace.html#preruseniprovozu', title: 'Přerušení provozu' },
        '2024-08-14': { class: 'preruseni', link: 'informace.html#preruseniprovozu', title: 'Přerušení provozu' },
        '2024-08-15': { class: 'preruseni', link: 'informace.html#preruseniprovozu', title: 'Přerušení provozu' },
        '2024-08-16': { class: 'preruseni', link: 'informace.html#preruseniprovozu', title: 'Přerušení provozu' },
        '2024-08-17': { class: 'preruseni', link: 'informace.html#preruseniprovozu', title: 'Přerušení provozu' },
        '2024-08-18': { class: 'preruseni', link: 'informace.html#preruseniprovozu', title: 'Přerušení provozu' },
        '2024-08-19': { class: 'preruseni', link: 'informace.html#preruseniprovozu', title: 'Přerušení provozu' },
        '2024-08-20': { class: 'preruseni', link: 'informace.html#preruseniprovozu', title: 'Přerušení provozu' },
        '2024-08-21': { class: 'preruseni', link: 'informace.html#preruseniprovozu', title: 'Přerušení provozu' },
        '2024-08-22': { class: 'preruseni', link: 'informace.html#preruseniprovozu', title: 'Přerušení provozu' },
        '2024-08-23': { class: 'preruseni', link: 'informace.html#preruseniprovozu', title: 'Přerušení provozu' },
        '2024-08-24': { class: 'preruseni', link: 'informace.html#preruseniprovozu', title: 'Přerušení provozu' },
        '2024-08-25': { class: 'preruseni', link: 'informace.html#preruseniprovozu', title: 'Přerušení provozu' },
        '2024-08-26': { class: 'preruseni', link: 'informace.html#preruseniprovozu', title: 'Přerušení provozu' },
        '2024-08-27': { class: 'preruseni', link: 'informace.html#preruseniprovozu', title: 'Přerušení provozu' },
        '2024-08-28': { class: 'preruseni', link: 'informace.html#preruseniprovozu', title: 'Přerušení provozu' },
        '2024-08-29': { class: 'preruseni', link: 'informace.html#preruseniprovozu', title: 'Přerušení provozu' },
        '2024-08-30': { class: 'preruseni', link: 'informace.html#preruseniprovozu', title: 'Přerušení provozu' },

        '2023-09-05': { class: 'akce', link: 'akce.html#zari', title: 'Třídní schůzky' },
        '2023-09-21': { class: 'akce', link: 'akce.html#zari', title: 'Výlet Huslík (Zelená)' },
        '2023-09-27': { class: 'akce', link: 'akce.html#zari', title: 'Čtení dětem dětem' },
        
        '2023-10-03': { class: 'akce', link: 'akce.html#rijen', title: 'Přednáška o dentální hygieně' },
        '2023-10-30': { class: 'akce', link: 'akce.html#rijen', title: 'Divadlo Jak Matěj vysvobodil vítr' },
        '2023-10-31': { class: 'akce', link: 'akce.html#rijen', title: 'Halloween' },
        
        '2023-11-10': { class: 'akce', link: 'akce.html#listopad', title: 'Výlet Huslík (Zelená)' },
        '2023-11-23': { class: 'akce', link: 'akce.html#listopad', title: 'Drakiáda' },
        '2023-11-29': { class: 'akce', link: 'akce.html#listopad', title: 'Divadlo Co malí medvědi o podzimu nevědí' },

        '2023-12-05': { class: 'akce', link: 'akce.html#prosinec', title: 'Mikulášská nadílka' },
        '2023-12-07': { class: 'akce', link: 'akce.html#prosinec', title: 'Výlet Divadlo Nymburk (Modrá)' },
        '2023-12-11': { class: 'besidka', link: 'akce.html#prosinec', title: 'Besídka' },
        '2023-12-12': { class: 'besidka', link: 'akce.html#prosinec', title: 'Besídka' },
        '2023-12-13': { class: 'besidka', link: 'akce.html#prosinec', title: 'Besídka' },
        '2023-12-14': { class: 'besidka', link: 'akce.html#prosinec', title: 'Besídka' },
        '2023-12-20': { class: 'akce', link: 'akce.html#prosinec', title: 'Vánoční nadílka v MŠ' },

        '2024-01-03': { class: 'akce', link: 'akce.html#leden', title: 'Divadlo O Zajíčkovi, který byl rád na světě' },
        '2024-01-05': { class: 'akce', link: 'akce.html#leden', title: 'Tříkrálová koleda' },
        '2024-01-17': { class: 'akce', link: 'akce.html#leden', title: 'Zdravá pětka' },
        '2024-01-22': { class: 'akce', link: 'akce.html#leden', title: 'Natáčení Veselá věda (Žlutá, Modrá)' },

        '2024-02-26': { class: 'akce', link: 'akce.html#unor', title: 'Výlet Národní muzeum (Zelená třída)' },
        '2024-02-28': { class: 'akce', link: 'akce.html#unor', title: 'Karneval' },
        '2024-02-29': { class: 'akce', link: 'akce.html#unor', title: 'Primavizus' },

        '2024-03-11': { class: 'akce', link: 'akce.html#brezen', title: 'Divadlo Jejda strašidýlka' },
        '2024-03-12': { class: 'akce', link: 'akce.html#brezen', title: 'Výlet Herna Nymburk (Modrá)' },
        '2024-03-21': { class: 'akce', link: 'akce.html#brezen', title: 'Výlet Výstaviště Lysá nad Labem (Žlutá)' },
        '2024-03-25': { class: 'akce', link: 'akce.html#brezen', title: 'Návštěva předškoláků v ZŠ' },
        '2024-03-26': { class: 'akce', link: 'akce.html#brezen', title: 'Putování s velikonočním zajíčkem' },

        '2024-04-30': { class: 'akce', link: 'akce.html#duben', title: 'Čarodějnice' },

        '2024-05-13': { class: 'akce', link: 'akce.html#kveten', title: 'Divadlo Jak včelička zachránila králíčka' },
        '2024-05-15': { class: 'akce', link: 'akce.html#kveten', title: 'Společné focení tříd' },
        '2024-05-29': { class: 'akce', link: 'akce.html#kveten', title: 'Divadlo Karneval' },
        '2024-05-30': { class: 'akce', link: 'akce.html#kveten', title: 'Dřevíčková dílna pana Pilnáčka' },

        '2024-06-20': { class: 'akce', link: 'akce.html#cerven', title: 'Zahradní slavnost' },
    };
  
    function formatDate(year, month, day) {
        const formattedMonth = (month + 1).toString().padStart(2, '0');
        const formattedDay = day.toString().padStart(2, '0');
        return year + '-' + formattedMonth + '-' + formattedDay;
    }
  
    //show
    generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
  });