import styleImports from "@css/imports.css?inline";
import styleTesteNivelamento from "@css/pages/teste-nivelamento.css?inline";

class TesteNivelamento extends HTMLElement {
  constructor() {
    super();

    [styleImports, styleTesteNivelamento].forEach((imports) => {
      const style = document.createElement("style");
      style.textContent = imports;
      this.appendChild(style);
    });

    const containers = [
      {
        bg: "#FB923C",
        level: "Beginner (A1)",
        taskContainer: [
          // Task 1
          {
            task: "#1",
            taskType: "Greetings, Introductions",
            langFocus: [
              {
                focus: "• Simple present of be",
              },
              {
                focus: "• Subject pronouns",
              },
              {
                focus: "• Possessive adjectives",
              },
            ],
            examples: [
              {
                example: "• Hello. How are you?",
              },
              {
                example: "• What's your name?",
              },
              {
                example: "• Where are you from?",
              },
            ],
          },
          // Task 2
          {
            task: "#2",
            taskType: "Talk about yourself",
            langFocus: [
              {
                focus: "• Simple Present",
              },
              {
                focus: "• Present continuous",
              },
            ],
            examples: [
              {
                example: "• Tell me a little about yourself.",
              },
              {
                example: "• Why are you studying English?",
              },
              {
                example: "• Do you study?",
              },
              {
                example: "• Do you have a job?",
              },
              {
                example: "• What's your schedule like?",
              }
            ],
          },
          // Task 3
          {
            task: "#3",
            taskType: "Talk about your free time",
            langFocus: [
              {
                focus: "• Simple present",
              },
              {
                focus: "• Can for ability",
              }
            ],
            examples: [
              {
                example: "• What do you do in your free time?",
              },
              {
                example: "• Do you like sports?",
              },
              {
                example: "• Can you play tennis (volleyball/soccer, etc.)",
              },
            ],
          }
        ],
      },
      {
        bg: "#FF0201",
        level: "Elementary (A2)",
        taskContainer: [
          // Task 4
          {
            task: "#4",
            taskType: "Talk about likes and dislikes",
            langFocus: [
              {
                focus: "• Simple present",
              }
            ],
            examples: [
              {
                example: "• Do you like movies (TV, music, etc.)",
              },
              {
                example: "• What kinds of movies (TV shows, music, etc.) do you like?",
              },
              {
                example: "• What's your favorite movie (TV show/type of music, etc.)?",
              },
            ],
          },
          // Tasl 5
          {
            task: "#5",
            taskType: "Talk about the past",
            langFocus: [
              {
                focus: "• Simple past",
              },
              {
                focus: "• Past be",
              }
            ],
            examples: [
              {
                example: "• Where did you grow up?",
              },
              {
                example: "• Did you study English in elementary school (middle school/high school)?",
              },
              {
                example: "• What other languages did you study?",
              },
              {
                example: "• What was your favorite class?",
              }
            ],
          },
          // Task 6
          {
            task: "#6",
            taskType: "Talk about plans",
            langFocus: [
              {
                focus: "• Future with present continuous and be going to",
              }
            ],
            examples: [
              {
                example: "• What are you doing later today?",
              },
              {
                example: "• Are you doing anything special tonight?",
              },
              {
                example: "• What are you going to do this weekend?",
              },
            ],
          }
        ],
      },
      {
        bg: "#238DEB",
        level: "Pre-Intermediate (A2-B1)",
        taskContainer: [
          // Task 7
          {
            task: "#7",
            taskType: "Talk about foods",
            langFocus: [
              {
                focus: "• Simple past vs. present perfect",
              }
            ],
            examples: [
              {
                example: "• Have you ever eaten Thai (Vietnamese/ Mexican, etc.) food?",
              },
              {
                example: "• Where did you eat it?",
              },
              {
                example: "• How did you like it?",
              },
              {
                example: "• What kinds of unusual foods have you eaten?",
              }
            ],
          },
          // Task 8
          {
            task: "#8",
            taskType: "Talk about your home",
            langFocus: [
              {
                focus: "• Descriptive adjectives",
              },
              {
                focus: "• Comparisons",
              }
            ],
            examples: [
              {
                example: "• Do you live in a house or an apartment?",
              },
              {
                example: "• What is it like?",
              },
              {
                example: "• Compare your home with someone else’s home.",
              },
            ],
          },
          // Task 9
          {
            task: "#9",
            taskType: "Give advice",
            langFocus: [
              {
                focus: "• Present modals",
              }
            ],
            examples: [
              {
                example: "• What advice would you give to tourists visiting your country/city?",
              },
              {
                example: "• What do they need to do to be prepared?",
              },
              {
                example: "• What places should they visit?",
              },
            ],
          }
        ],
      },
      {
        bg: "#82C121",
        level: "Intermediate (A2-B1)",
        taskContainer: [
          // Task 10
          {
            task: "#10",
            taskType: "Describe the past/tell a story",
            langFocus: [
              {
                focus: "• Simple past",
              },
              {
                focus: "• Past continuous",
              }
            ],
            examples: [
              {
                example: "• Describe a difficult event in your life.",
              },
              {
                example: "• What happened?",
              },
              {
                example: "• What were you doing at the time?",
              },
            ],
          },
          // Task 11
          {
            task: "#11",
            taskType: "Talk about learning preferences",
            langFocus: [
              {
                focus: "• Would rather and would prefer",
              }
            ],
            examples: [
              {
                example: "• If you could study anything you wanted, what would you study?",
              },
              {
                example: "• Would you rather study in the day or at night?",
              },
              {
                example: "• Would you prefer to take an art class or a photography class?",
              },
            ],
          },
          // Task 12
          {
            task: "#12",
            taskType: "Speculate about the future",
            langFocus: [
              {
                focus: "• Future tenses",
              }
            ],
            examples: [
              {
                example: "• What will you be doing a year from now?",
              },
              {
                example: "• How do you think it will be different then?",
              },
              {
                example: "• Will you have finished your studies?",
              },
            ],
          }
        ],
      },
    ];

    const page = document.createElement("h1");
    page.className = "card"
    page.textContent = "Teste Nivelamento"
    this.appendChild(page);

    //! Level
    containers.forEach((item) => {
      // Container
      const container = document.createElement("div");
      container.className = "nivel-container";
      container.style.backgroundColor = item.bg;
      this.appendChild(container);

      const level = document.createElement("span");
      level.textContent = item.level;
      container.appendChild(level);

      item.taskContainer.forEach((taskItem) => {
        //! Task Container
        const taskContainer = document.createElement("div");
        taskContainer.className = "task-container";
        this.appendChild(taskContainer);

        //! TASKS

        //! Task Number Wrapper
        const taskNumberWrapper = document.createElement("div");
        taskContainer.appendChild(taskNumberWrapper);

        const taskBold = document.createElement("span");
        taskBold.className = "display-block";
        taskBold.textContent = "TASK";
        taskBold.className = "bold";
        taskNumberWrapper.appendChild(taskBold);

        const task = document.createElement("span");
        task.className = "display-block";
        task.textContent = taskItem.task;
        taskNumberWrapper.appendChild(task);

        //! Task Type Wrapper
        const taskTypeWrapper = document.createElement("div");
        taskContainer.appendChild(taskTypeWrapper);

        const taskTypeBold = document.createElement("span");
        taskTypeBold.className = "display-block";
        taskTypeBold.textContent = "TASK TYPE";
        taskTypeBold.className = "bold";
        taskTypeWrapper.appendChild(taskTypeBold);

        const taskType = document.createElement("span");
        taskType.className = "display-block";
        taskType.textContent = taskItem.taskType;
        taskTypeWrapper.appendChild(taskType);

        //! Language Focus Wrapper
        const langFocusWrapper = document.createElement("div");
        taskContainer.appendChild(langFocusWrapper);

        const langFocusBold = document.createElement("span");
        langFocusBold.className = "display-block";
        langFocusBold.textContent = "LANGUAGE FOCUS";
        langFocusBold.className = "bold";
        langFocusWrapper.appendChild(langFocusBold);

        taskItem.langFocus.forEach((focusItem) => {
          const langFocus = document.createElement("span");
          langFocus.className = "display-block";
          langFocus.textContent = focusItem.focus;
          langFocusWrapper.appendChild(langFocus);
        });

        //! Examples Wrapper
        const examplesWrapper = document.createElement("div");
        taskContainer.appendChild(examplesWrapper);

        const examplesBold = document.createElement("span");
        examplesBold.className = "display-block";
        examplesBold.textContent = "EXAMPLES";
        examplesBold.className = "bold";
        examplesWrapper.appendChild(examplesBold);

        taskItem.examples.forEach((exampleItem) => {
          const examples = document.createElement("span");
          examples.className = "display-block";
          examples.textContent = exampleItem.example;
          examplesWrapper.appendChild(examples);
        });
      });
    });
  }
}

export default TesteNivelamento;
