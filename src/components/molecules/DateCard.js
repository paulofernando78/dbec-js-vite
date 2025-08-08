import cssImportsPath from "/src/css/imports.css?inline";

class DateCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);
  }

  set data(dateCard) {
    const container = document.createElement("div");
    container.style.border = "var(--border)";
    container.style.borderRadius = "var(--border-radius)";
    container.style.boxShadow = "var(--box-shadow)";
    container.style.marginBottom = "16px";
    container.style.overflow = "auto";

    const cardLabel = document.createElement("div");
    cardLabel.style.display = "flex";
    cardLabel.style.alignItems = "center";
    cardLabel.style.gap = "4px";
    cardLabel.style.width = "100%";
    cardLabel.style.padding = "2px 5px";
    cardLabel.style.backgroundColor = "var(--gray-3)";
    cardLabel.textContent = dateCard.label;
    cardLabel.style.fontWeight = "bold";
    container.appendChild(cardLabel);

    if (Array.isArray(dateCard.date)) {
      const dateContainer = document.createElement("div");
      // dateContainer.style.display = "flex";
      dateContainer.style.gap = "20px";
      dateContainer.style.padding = "var(--padding)";
      container.appendChild(dateContainer);

      dateCard.date.forEach((monthItem) => {
        const monthContainer = document.createElement("div");

        const monthEl = document.createElement("span");
        monthEl.style.display = "block";
        monthEl.textContent = monthItem.label;
        monthEl.style.fontWeight = "bold";
        monthEl.style.marginBlock = "10px";
        monthContainer.appendChild(monthEl);

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
          dropdownWrapper.style.display = "grid";
          dropdownWrapper.style.gridTemplateColumns = "60px 65px auto";
          dropdownWrapper.style.alignItems = "center";
          dropdownWrapper.style.gap = "8px";
          dropdownWrapper.style.marginBottom = "3px";
          monthContainer.appendChild(dropdownWrapper);

          const options = [
            { value: "...", label: "..." },
            { value: "OK", label: "OK" },
            { value: "SC", label: "SC" },
            { value: "TC", label: "TC" },
            { value: "R", label: "R" },
            { value: "ROK", label: "ROK" },
            { value: "H", label: "H" },
            { value: "-", label: "-" },
          ];

          if (Array.isArray(dayItem.day)) {
            dayItem.day.forEach((item) => {
              const select = document.createElement("select");
              // select.style.fontWeight = "bold"
              select.style.borderRadius = "var(--border-radius)"

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
            ROK: "var(--orange-4)",
            H: "var(--violet-4)",
            "...": "var(--gray-3)",
          };

          const applySelectColors = () => {
            const color = statusColors[select.value];
            select.style.backgroundColor = color;
          };

          applySelectColors(); // Apply on first load

          select.addEventListener("change", applySelectColors); // Re-apply when changed

              const classNote = document.createElement("wc-note");
              classNote.data = {
                value: item.classNotes,
                placeholder: "Class notes",
                height: "29px",
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

    this.shadowRoot.append(container);
  }
}

export default DateCard;
