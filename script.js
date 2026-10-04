/* =========================================
   FITBUDDY V2 JAVASCRIPT
========================================= */


/* THEME */

function toggleTheme() {

    document.body.classList.toggle("dark");

    const mode =
        document.body.classList.contains("dark")
            ? "dark"
            : "light";

    localStorage.setItem("fitbuddyTheme", mode);
}


function loadTheme() {

    if (localStorage.getItem("fitbuddyTheme") === "dark") {
        document.body.classList.add("dark");
    }
}


/* SIGNUP */

function signupUser() {

    const name =
        document.getElementById("signupName").value.trim();

    const email =
        document.getElementById("signupEmail").value.trim();

    const password =
        document.getElementById("signupPassword").value;

    const confirm =
        document.getElementById("signupConfirm").value;

    const message =
        document.getElementById("signupMessage");


    if (!name || !email || !password || !confirm) {

        message.innerText =
            "⚠️ Please fill all fields.";

        return;
    }


    if (password.length < 6) {

        message.innerText =
            "⚠️ Password must be at least 6 characters.";

        return;
    }


    if (password !== confirm) {

        message.innerText =
            "⚠️ Passwords do not match.";

        return;
    }


    localStorage.setItem("fitbuddyName", name);
    localStorage.setItem("fitbuddyEmail", email);
    localStorage.setItem("fitbuddyPassword", password);
    localStorage.setItem("fitbuddyGoal", "Stay Fit");


    message.innerText =
        "✅ Account created successfully!";


    setTimeout(function() {

        window.location.href = "login.html";

    }, 1000);
}


/* LOGIN */

function loginUser() {

    const email =
        document.getElementById("loginEmail").value.trim();

    const password =
        document.getElementById("loginPassword").value;

    const message =
        document.getElementById("loginMessage");


    const savedEmail =
        localStorage.getItem("fitbuddyEmail");

    const savedPassword =
        localStorage.getItem("fitbuddyPassword");


    if (!email || !password) {

        message.innerText =
            "⚠️ Enter email and password.";

        return;
    }


    if (email === savedEmail && password === savedPassword) {

        localStorage.setItem(
            "fitbuddyLoggedIn",
            "true"
        );


        message.innerText =
            "✅ Login successful!";


        setTimeout(function() {

            window.location.href =
                "dashboard.html";

        }, 800);

    } else {

        message.innerText =
            "❌ Invalid email or password.";

    }
}


/* LOGOUT */

function logoutUser() {

    localStorage.removeItem(
        "fitbuddyLoggedIn"
    );

    window.location.href =
        "index.html";
}


/* BMI */

function calculateBMI() {

    const weight =
        parseFloat(
            document.getElementById("bmiWeight").value
        );

    const height =
        parseFloat(
            document.getElementById("bmiHeight").value
        );

    const result =
        document.getElementById("bmiResult");


    if (!weight || !height || weight <= 0 || height <= 0) {

        result.innerText =
            "⚠️ Enter valid weight and height.";

        return;
    }


    const heightMeters =
        height / 100;


    const bmi =
        weight /
        (heightMeters * heightMeters);


    const rounded =
        bmi.toFixed(1);


    let category;


    if (bmi < 18.5) {

        category = "Underweight";

    } else if (bmi < 25) {

        category = "Normal Weight";

    } else if (bmi < 30) {

        category = "Overweight";

    } else {

        category = "Obesity";

    }


    localStorage.setItem(
        "fitbuddyBMI",
        rounded
    );

    localStorage.setItem(
        "fitbuddyBMICategory",
        category
    );


    result.innerHTML =
        "Your BMI: <strong>" +
        rounded +
        "</strong><br>" +
        "Category: <strong>" +
        category +
        "</strong>";
}


/* CALORIES */

function calculateCalories() {

    const age =
        parseFloat(
            document.getElementById("calAge").value
        );

    const weight =
        parseFloat(
            document.getElementById("calWeight").value
        );

    const height =
        parseFloat(
            document.getElementById("calHeight").value
        );

    const gender =
        document.getElementById("calGender").value;

    const activity =
        parseFloat(
            document.getElementById("activityLevel").value
        );

    const result =
        document.getElementById("calorieResult");


    if (
        !age ||
        !weight ||
        !height ||
        age <= 0 ||
        weight <= 0 ||
        height <= 0
    ) {

        result.innerText =
            "⚠️ Enter valid details.";

        return;
    }


    let bmr;


    if (gender === "male") {

        bmr =
            10 * weight +
            6.25 * height -
            5 * age +
            5;

    } else {

        bmr =
            10 * weight +
            6.25 * height -
            5 * age -
            161;

    }


    const calories =
        Math.round(
            bmr * activity
        );


    localStorage.setItem(
        "fitbuddyCalories",
        calories
    );


    result.innerHTML =
        "Estimated daily calories:<br>" +
        "<strong>" +
        calories +
        " kcal</strong>";
}


/* WATER */

function addWater() {

    let water =
        parseInt(
            localStorage.getItem("fitbuddyWater")
        ) || 0;


    if (water < 8) {
        water++;
    }


    localStorage.setItem(
        "fitbuddyWater",
        water
    );


    updateWater();
}


function resetWater() {

    localStorage.setItem(
        "fitbuddyWater",
        "0"
    );


    updateWater();
}


function updateWater() {

    const water =
        parseInt(
            localStorage.getItem("fitbuddyWater")
        ) || 0;


    const display =
        document.getElementById("waterDisplay");

    const stat =
        document.getElementById("waterStat");


    if (display) {
        display.innerText = water;
    }


    if (stat) {
        stat.innerText = water;
    }
}


/* WORKOUT */

function updateWorkout() {

    const exercises =
        document.querySelectorAll(
            ".exerciseCheck"
        );


    const total =
        exercises.length;


    let completed = 0;


    exercises.forEach(function(item) {

        if (item.checked) {
            completed++;
        }

    });


    const percentage =
        Math.round(
            (completed / total) * 100
        );


    localStorage.setItem(
        "fitbuddyWorkout",
        percentage
    );


    const percentageText =
        document.getElementById(
            "workoutPercentage"
        );

    const progress =
        document.getElementById(
            "workoutProgressBar"
        );

    const message =
        document.getElementById(
            "workoutMessage"
        );


    if (percentageText) {
        percentageText.innerText =
            percentage + "%";
    }


    if (progress) {
        progress.style.width =
            percentage + "%";
    }


    if (message) {

        if (percentage === 100) {

            message.innerText =
                "🎉 Excellent! Workout completed!";

        } else if (percentage >= 50) {

            message.innerText =
                "💪 Great work! Keep going!";

        } else {

            message.innerText =
                "🏃 Let's get started!";

        }

    }
}


/* DASHBOARD */

function loadDashboard() {

    const name =
        localStorage.getItem(
            "fitbuddyName"
        ) || "User";


    const nameElement =
        document.getElementById(
            "dashboardName"
        );


    if (nameElement) {
        nameElement.innerText = name;
    }


    const date =
        document.getElementById(
            "todayDate"
        );


    if (date) {

        date.innerText =
            new Date().toLocaleDateString(
                "en-IN",
                {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                }
            );

    }


    updateWater();


    const bmi =
        localStorage.getItem(
            "fitbuddyBMI"
        ) || "--";


    const calories =
        localStorage.getItem(
            "fitbuddyCalories"
        ) || "0";


    const workout =
        localStorage.getItem(
            "fitbuddyWorkout"
        ) || "0";


    const bmiStat =
        document.getElementById(
            "bmiStat"
        );


    const calorieStat =
        document.getElementById(
            "calorieStat"
        );


    const workoutStat =
        document.getElementById(
            "workoutStat"
        );


    const progressBar =
        document.getElementById(
            "progressBar"
        );


    const progressText =
        document.getElementById(
            "progressText"
        );


    if (bmiStat) {
        bmiStat.innerText = bmi;
    }


    if (calorieStat) {
        calorieStat.innerText = calories;
    }


    if (workoutStat) {
        workoutStat.innerText =
            workout + "%";
    }


    if (progressBar) {
        progressBar.style.width =
            workout + "%";
    }


    if (progressText) {

        progressText.innerText =
            workout === "100"
                ? "🎉 Workout completed!"
                : "You have completed " +
                  workout +
                  "% of today's workout.";

    }
}


/* PROFILE */

function loadProfile() {

    const name =
        localStorage.getItem(
            "fitbuddyName"
        ) || "";


    const email =
        localStorage.getItem(
            "fitbuddyEmail"
        ) || "";


    const age =
        localStorage.getItem(
            "fitbuddyAge"
        ) || "";


    const goal =
        localStorage.getItem(
            "fitbuddyGoal"
        ) || "Stay Fit";


    const nameText =
        document.getElementById(
            "profileName"
        );


    const emailText =
        document.getElementById(
            "profileEmail"
        );


    const nameInput =
        document.getElementById(
            "profileNameInput"
        );


    const emailInput =
        document.getElementById(
            "profileEmailInput"
        );


    const ageInput =
        document.getElementById(
            "profileAge"
        );


    const goalInput =
        document.getElementById(
            "profileGoal"
        );


    if (nameText) {
        nameText.innerText = name;
    }


    if (emailText) {
        emailText.innerText = email;
    }


    if (nameInput) {
        nameInput.value = name;
    }


    if (emailInput) {
        emailInput.value = email;
    }


    if (ageInput) {
        ageInput.value = age;
    }


    if (goalInput) {
        goalInput.value = goal;
    }
}


function saveProfile() {

    const name =
        document.getElementById(
            "profileNameInput"
        ).value.trim();


    const email =
        document.getElementById(
            "profileEmailInput"
        ).value.trim();


    const age =
        document.getElementById(
            "profileAge"
        ).value;


    const goal =
        document.getElementById(
            "profileGoal"
        ).value;


    localStorage.setItem(
        "fitbuddyName",
        name
    );

    localStorage.setItem(
        "fitbuddyEmail",
        email
    );

    localStorage.setItem(
        "fitbuddyAge",
        age
    );

    localStorage.setItem(
        "fitbuddyGoal",
        goal
    );


    document.getElementById(
        "profileName"
    ).innerText = name;


    document.getElementById(
        "profileEmail"
    ).innerText = email;


    document.getElementById(
        "profileMessage"
    ).innerText =
        "✅ Profile saved successfully.";
}


/* HISTORY */

function loadHistory() {

    const bmi =
        localStorage.getItem(
            "fitbuddyBMI"
        ) || "--";


    const calories =
        localStorage.getItem(
            "fitbuddyCalories"
        ) || "--";


    const workout =
        localStorage.getItem(
            "fitbuddyWorkout"
        ) || "0";


    const water =
        localStorage.getItem(
            "fitbuddyWater"
        ) || "0";


    const name =
        localStorage.getItem(
            "fitbuddyName"
        ) || "--";


    const goal =
        localStorage.getItem(
            "fitbuddyGoal"
        ) || "--";


    const age =
        localStorage.getItem(
            "fitbuddyAge"
        ) || "--";


    setText("historyBMI", bmi);
    setText("historyCalories", calories);
    setText("historyWorkout", workout + "%");
    setText("historyWater", water);
    setText("historyName", name);
    setText("historyGoal", goal);
    setText("historyAge", age);
}


/* ADMIN */

function loadAdmin() {

    const name =
        localStorage.getItem(
            "fitbuddyName"
        );


    const email =
        localStorage.getItem(
            "fitbuddyEmail"
        );


    const goal =
        localStorage.getItem(
            "fitbuddyGoal"
        );


    const bmi =
        localStorage.getItem(
            "fitbuddyBMI"
        );


    const calories =
        localStorage.getItem(
            "fitbuddyCalories"
        );


    const workout =
        localStorage.getItem(
            "fitbuddyWorkout"
        ) || "0";


    setText(
        "adminUsers",
        name ? "1" : "0"
    );

    setText(
        "adminWorkout",
        workout + "%"
    );

    setText(
        "adminBMI",
        bmi || "--"
    );

    setText(
        "adminCalories",
        calories || "--"
    );

    setText(
        "adminName",
        name || "No user"
    );

    setText(
        "adminEmail",
        email || "No user"
    );

    setText(
        "adminGoal",
        goal || "No goal"
    );
}


/* CLEAR DATA */

function clearFitnessData() {

    const confirmDelete =
        confirm(
            "Clear your saved fitness data?"
        );


    if (!confirmDelete) {
        return;
    }


    localStorage.removeItem("fitbuddyBMI");
    localStorage.removeItem("fitbuddyBMICategory");
    localStorage.removeItem("fitbuddyCalories");
    localStorage.removeItem("fitbuddyWorkout");
    localStorage.removeItem("fitbuddyWater");
    localStorage.removeItem("fitbuddyAge");
    localStorage.removeItem("fitbuddyGoal");


    location.reload();
}


/* DAILY TIP */

function loadTip() {

    const tips = [

        "💧 Drink water regularly throughout the day.",

        "🥗 Add more fruits and vegetables to your meals.",

        "🏃 Stay active and avoid sitting for long periods.",

        "😴 Give your body enough time to rest.",

        "💪 Consistency is more important than perfection.",

        "🧘 Stretch regularly to improve flexibility."

    ];


    const element =
        document.getElementById(
            "dailyTip"
        );


    if (element) {

        const index =
            new Date().getDate()
            % tips.length;

        element.innerText =
            tips[index];

    }
}


/* HELPER */

function setText(id, value) {

    const element =
        document.getElementById(id);


    if (element) {
        element.innerText = value;
    }
}


/* PAGE INITIALIZATION */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadTheme();

        loadDashboard();

        loadProfile();

        loadHistory();

        loadAdmin();

        loadTip();

    }
);