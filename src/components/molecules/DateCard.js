import cssImportsPath from "/src/css/imports.css?inline";

class DateCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);

    const css = document.createElement("style"); /*css */
    css.textContent = `
      .card-container {
        border: var(--border);
        border-radius: var(--border-radius);
        box-shadow: var(--box-shadow);
        overflow: hidden;
      }

      .card-label {
        display: flex;
        align-items: center;
        gap: 4px;
      }
      
    `;
    this.shadowRoot.appendChild(css);
  }

  set data(dateCard) {
    const container = document.createElement("div");
    container.classList.add("card-container");
    container.style.marginBottom = "16px";
    container.style.overflow = "auto";

    const cardLabel = document.createElement("div");
    cardLabel.style.height = "max-content";
    cardLabel.style.padding = "2px 5px";
    cardLabel.style.backgroundColor = "var(--gray-3)";
    cardLabel.textContent = dateCard.label;
    cardLabel.style.fontWeight = "bold";
    container.appendChild(cardLabel);

    if (Array.isArray(dateCard.date)) {
      const dateContainer = document.createElement("div");
      dateContainer.style.display = "flex";
      dateContainer.style.width = "max-content";
      dateContainer.style.gap = "20px";
      dateContainer.style.padding = "2px 4px 1px 4px";
      container.appendChild(dateContainer);

      dateCard.date.forEach((monthItem) => {
        const monthContainer = document.createElement("div");
        monthContainer.style.width = "max-content";

        const monthEl = document.createElement("span");
        monthEl.style.display = "block";
        monthEl.textContent = monthItem.label;
        monthEl.style.fontWeight = "bold";
        monthEl.style.marginBottom = "10px";
        monthContainer.appendChild(monthEl);
        dateContainer.appendChild(monthContainer);

        monthItem.month.forEach((dayItem) => {
          const dropdownWrapper = document.createElement("div");
          dropdownWrapper.style.display = "flex";
          dropdownWrapper.style.alignItems = "center";
          dropdownWrapper.style.gap = "8px";
          dropdownWrapper.style.marginBottom = "3px";
          monthContainer.appendChild(dropdownWrapper);

          const options = [
            { value: "Okey", label: "OK" },
            { value: "Student canceled", label: "SC" },
            { value: "Teacher canceled", label: "TC" },
            { value: "Replace", label: "R" },
            { value: "Replacement OK", label: "ROK" },
            { value: "Holiday", label: "H" },
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

              select.value = item.option || "";
              dropdownWrapper.appendChild(select);

              const p = document.createElement("p");
              p.textContent = item.text;
              dropdownWrapper.appendChild(p);
            });
          }
        });
      });
    }

    this.shadowRoot.append(container);
  }
}

export default DateCard;
