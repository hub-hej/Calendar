// Funkcja do wywoływania generowania kalendarza przy ładowaniu
window.onload = function (){
    generateCalendar();
}

// Funkcja generująca kalendarz 
function generateCalendar(){
    const calendar = document.getElementById('calendar');

    // Utworzenie nowego obiektu Date w celu uzyskania bieżącej daty, miesiąca i roku
    const currentDate = new Date();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    // Obliczenie pierwszego i ostatnie dnia miesiąca
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    // Obliczenie dnia tygodnia pierwszego dnia miesiąca
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const totalDays = lastDayOfMonth.getDate();

    // Dodanie pustych elementów div'a dla dnia przed pierwszym dniem miesiąca
    for(let i = 0; i < firstDayOfWeek; i++){
        let blankDay = document.createElement("div");
        calendar.appendChild(blankDay);
    }

    // Dodaj elementy div dla każdego dnia miesiąca
    for(let day = 1; day <= totalDays; day++){
        let daySquare = document.createElement("div");
        daySquare.className = "calendar-day";
        daySquare.textContent = day;
        daySquare.id = `day-${day}`;
        calendar.appendChild(daySquare);
    }

    // Funkcja wyświetlająca okno dodawania zadania 
    function showAddTaskModal(){
        document.getElementById('add-task-modal').style.display = 'block';
    }
    // Funkcja zamykająca okno modalne dodawania zadania
    function closeAddTaskModal(){
        document.getElementById('add-task-modal').style.display = 'none';
    }
    // Funkcja usuwania zadania
    function deleteTask(taskElement){
        // Okno dialogowe potwierdzenia usunięcia
        if(confirm("Jesteś pewny czy chcesz usunąć te zadanie?")){
            // Jeśli użytkownik potwierdzi, usunie element zadania z jego elementu nadrzędnego
            taskElement.parentNode.removeChild(taskElement);
        }
    }

    // Funkcja do edytowania zadania
    function editTask(taskElement){

        // Prośba do użytkownika o edycję opisu zadania, z bieżącym opisem jako domyślny
        const newTaskDesc = prompt("Edytuj swoje zadanie:", taskElement.textContent);
        // Sprawdzenie, czy użytkownik wprowadził nowy opis zadania i czy nie jest on pusty
        if(newTaskDesc !== null & newTaskDesc.trim() !== ""){
            // Zaktualizowanie zawartości tekstowej elementu zadania o nowy opis
            taskElement.textContent = newTaskDesc;
        }
    }

    // Funkcja dodawania zadania 
    function addTask(){
        // Pobieramy datę i opis zadania z pól wejściowych
        const taskDate = new Date(document.getElementById('task-date').value);
        const taskDesc = document.getElementById('task-desc').value.trim();

        // Zatwierdzamy datę i opis zadania
        if(taskDesc && !isNaN(taskDate.getDate())){
            // Uzyskanie dni kalendarzowych
            const calendarDays = document.getElementById('calendar').children;
            
            // Iterujemy przez dni kalendarzowe
            for(let i = 0; i < calendarDays.length; i++){
                const day = calendarDays[i];

                // Sprawdzamy, czy dzień odpowiada dacie zadania
                if(parseInt(day.textContent) === taskDate.getDate()){
                    // Tworzymy element zadania
                    const taskElement = document.createElement("div");
                    taskElement.className = "task";
                    taskElement.textContent = taskDesc;

                    // Dodanie detektora zdarzeń dla kliknięcia prawym przyciskiem myszy w celu usunięcia zadania
                    taskElement.addEventListener("contextmenu", function(event){
                        event.preventDefault();
                        deleteTask(taskElement);
                    })
                }
            }
        }
    }

}