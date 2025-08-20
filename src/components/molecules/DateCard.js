import cssImportsPath from "/src/css/imports.css?inline";

class DateCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);

    const css = document.createElement("style");
    /*css*/
    css.textContent = `
      .reference-container {
      display: flex;
      flex-direction: column;
      gap: 3px
      }
    
      .reference-title {
        font-style: italic
      }

      .reference {
      width: max-content;
      font-size: 0.8rem;
      padding: var(--padding);
      border: 1px solid var(--gray-5);
      border-radius: var(--border-radius);
      }

      .year-container {
        border: var(--border);
        border-radius: var(--border-radius);
        overflow: auto
      }

      .card-label {
        padding: var(--padding);
        background-color: var(--gray-3);
        font-weight: bold
      }

      .date-container {
        padding: var(--padding)
      }

      .month-title {
        display: block;
        font-weight: bold;
        margin-bottom: 10px

      }

      .dropdown-wrapper {
        display: grid;
        grid-template-columns: 60px 65px auto;
        align-items: center;
        gap: 8px;
        margin-top: 3px
      }

      select {
        border-radius: var(--border-radius)
      }

      .class-note {
        height: 29px
      }
    `;

    this.shadowRoot.appendChild(css);
  }

  set data(dateCard) {
    const container = document.createElement("div")
    container.classList.add("line-break")
    this.shadowRoot.appendChild(container);

    const ribbon = document.createElement("wc-ribbon");
    ribbon.classList.add("ribbon");
    ribbon.data = {
      icon: "date",
      label: "Schedule",
    };
    container.appendChild(ribbon);

    const referenceTitle = document.createElement("span");
    referenceTitle.classList.add("reference-title")
    referenceTitle.textContent = "Reference"
    container.appendChild(referenceTitle);

    const reference = [
      {
        status: "OK",
        color: "var(--green-6)"
      },
      {
        status: "SC (Student Canceled)",
        color: "var(--red-4)"
      },
      {
        status: "TC (Teacher Canceled)",
        color: "var(--red-4)"
      },
      {
        status: "R (Replace)",
        color: "var(--yellow-4)"
      },
      {
        status: "ROK (Replacement OK)",
        color: "var(--green-6)"
      },
      {
        status: "H (Holiday)",
        color: "var(--violet-4)"
      },
      {
        status: "V (Vacation)",
        color: "var(--violet-5)"
      },
    ];

    const referenceContainer = document.createElement("div");
    referenceContainer.classList.add("reference-container")
    container.appendChild(referenceContainer)

    reference.forEach((item) => {
      const Reference = document.createElement("div");
      Reference.classList.add("reference");
      Reference.textContent = item.status;
      Reference.style.backgroundColor = item.color
      referenceContainer.appendChild(Reference);
    })

    const yearContainer = document.createElement("div");
    yearContainer.classList.add("year-container");
    container.appendChild(yearContainer)

    const cardLabel = document.createElement("div");
    cardLabel.classList.add("card-label");
    cardLabel.textContent = dateCard.label;
    yearContainer.appendChild(cardLabel);

    if (Array.isArray(dateCard.date)) {
      const dateContainer = document.createElement("div");
      dateContainer.classList.add("date-container");
      yearContainer.appendChild(dateContainer);

      dateCard.date.forEach((monthItem) => {
        const monthContainer = document.createElement("div");
        monthContainer.classList.add("month-container")

        const monthTitle = document.createElement("span");
        monthTitle.classList.add("month-title");
        monthTitle.textContent = monthItem.label;
        monthContainer.appendChild(monthTitle);

        const monthNote = document.createElement("wc-note");
        monthNote.data = {
          value: monthItem.monthNotes,
          placeholder: "Month notes",
          height: "50px",
        };
        monthContainer.appendChild(monthNote);

        dateContainer.appendChild(monthContainer);

        monthItem.month.forEach((dayItem) => {
          const dropdownWrapper = document.createElement("div");
          dropdownWrapper.classList.add("dropdown-wrapper");
          monthContainer.appendChild(dropdownWrapper);

          const options = [
            { value: "...", label: "..." },
            { value: "OK", label: "OK" },
            { value: "SC", label: "SC" },
            { value: "TC", label: "TC" },
            { value: "R", label: "R" },
            { value: "ROK", label: "ROK" },
            { value: "H", label: "H" },
            { value: "V", label: "V" },
          ];

          if (Array.isArray(dayItem.day)) {
            dayItem.day.forEach((item) => {
              const select = document.createElement("select");

              options.forEach((opt) => {
                const option = document.createElement("option");
                option.value = opt.value;
                option.textContent = opt.label;
                select.appendChild(option);
              });

              select.value = item.status || "";
              dropdownWrapper.appendChild(select);

              const p = document.createElement("p");
              p.textContent = item.date;
              dropdownWrapper.appendChild(p);

              const statusColors = {
                OK: "var(--green-5)",
                SC: "var(--red-4)",
                TC: "var(--red-4)",
                R: "var(--yellow-4)",
                ROK: "var(--green-6)",
                H: "var(--violet-4)",
                V: "var(--violet-5)",
                "...": "var(--gray-3)",
              };

              const applySelectColors = () => {
                const color = statusColors[select.value];
                select.style.backgroundColor = color;
              };

              applySelectColors(); // Apply on first load

              select.addEventListener("change", applySelectColors); // Re-apply when changed

              const classNote = document.createElement("wc-note");
              classNote.classList.add("class-note");
              classNote.data = {
                value: item.classNotes,
                placeholder: "Class notes",
              };
              dropdownWrapper.appendChild(classNote);
            });
          }

          if (dayItem.hr) {
            const hr = document.createElement("hr");
            monthContainer.appendChild(hr);
          }
        });
      });
    }
  }
}

export default DateCard;
