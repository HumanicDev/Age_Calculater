document.addEventListener("DOMContentLoaded", function () {
  // Set max date to today
  const today = new Date();
  const maxDate = today.toISOString().split("T")[0];
  document.getElementById("birthdate").setAttribute("max", maxDate);
  document.getElementById("compare-date").setAttribute("max", maxDate);

  // Set compare date to today
  document.getElementById("compare-date").value = maxDate;

  // Calculate button event
  document
    .getElementById("calculate-btn")
    .addEventListener("click", calculateAge);

  // Theme toggle
  document
    .getElementById("theme-toggle")
    .addEventListener("click", toggleTheme);

  // Initial calculation with example date
  document.getElementById("birthdate").value = "1990-01-01";
  calculateAge();

  function calculateAge() {
    const birthdateInput = document.getElementById("birthdate").value;
    const compareDateInput =
      document.getElementById("compare-date").value || maxDate;
    const errorElement = document.getElementById("error-msg");

    if (!birthdateInput) {
      errorElement.style.display = "block";
      return;
    }

    errorElement.style.display = "none";

    const birthdate = new Date(birthdateInput);
    const compareDate = new Date(compareDateInput);

    // Check if birthdate is in the future
    if (birthdate > compareDate) {
      errorElement.textContent =
        "Birthdate must be before the comparison date!";
      errorElement.style.display = "block";
      return;
    }

    // Calculate age
    let years = compareDate.getFullYear() - birthdate.getFullYear();
    let months = compareDate.getMonth() - birthdate.getMonth();
    let days = compareDate.getDate() - birthdate.getDate();

    if (days < 0) {
      months--;
      // Get the number of days in the previous month
      const lastMonth = new Date(
        compareDate.getFullYear(),
        compareDate.getMonth(),
        0
      );
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Update age display
    document.getElementById("years").textContent = years;
    document.getElementById("months").textContent = months;
    document.getElementById("days").textContent = days;

    // Calculate total time
    const totalDays = Math.floor(
      (compareDate - birthdate) / (1000 * 60 * 60 * 24)
    );
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;

    document.getElementById("total-days").textContent =
      totalDays.toLocaleString();
    document.getElementById("total-weeks").textContent =
      totalWeeks.toLocaleString();
    document.getElementById("total-months").textContent =
      totalMonths.toLocaleString();

    // Calculate day of week
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    document.getElementById("day-of-week").textContent =
      daysOfWeek[birthdate.getDay()];

    // Calculate next birthday
    const nextBirthday = new Date(
      compareDate.getFullYear(),
      birthdate.getMonth(),
      birthdate.getDate()
    );
    if (nextBirthday < compareDate) {
      nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }

    const daysUntilBirthday = Math.floor(
      (nextBirthday - compareDate) / (1000 * 60 * 60 * 24)
    );
    document.getElementById(
      "countdown"
    ).textContent = `${daysUntilBirthday} days`;

    // Format next birthday date
    const options = { month: "short", day: "numeric", year: "numeric" };
    document.getElementById("next-birthday-date").textContent =
      nextBirthday.toLocaleDateString("en-US", options);

    // Calculate age at next birthday
    document.getElementById("next-age").textContent = `${years + 1} years`;

    // Calculate zodiac sign
    document.getElementById("zodiac-sign").textContent =
      calculateZodiac(birthdate);
  }

  function calculateZodiac(birthdate) {
    const day = birthdate.getDate();
    const month = birthdate.getMonth() + 1;

    if ((month === 1 && day <= 20) || (month === 12 && day >= 22)) {
      return "Capricorn";
    } else if ((month === 1 && day >= 21) || (month === 2 && day <= 18)) {
      return "Aquarius";
    } else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
      return "Pisces";
    } else if ((month === 3 && day >= 21) || (month === 4 && day <= 20)) {
      return "Aries";
    } else if ((month === 4 && day >= 21) || (month === 5 && day <= 20)) {
      return "Taurus";
    } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
      return "Gemini";
    } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
      return "Cancer";
    } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
      return "Leo";
    } else if ((month === 8 && day >= 23) || (month === 9 && day <= 23)) {
      return "Virgo";
    } else if ((month === 9 && day >= 24) || (month === 10 && day <= 22)) {
      return "Libra";
    } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
      return "Scorpio";
    } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
      return "Sagittarius";
    }
    return "Unknown";
  }

  function toggleTheme() {
    document.body.classList.toggle("dark-mode");
    const themeToggle = document.getElementById("theme-toggle");
    if (document.body.classList.contains("dark-mode")) {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
  }
});
