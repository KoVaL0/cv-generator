module.exports = ({first_name, last_name, skills, current_position, projectActivities}) => {
  return `
    <html>
       <head>
          <meta charset="utf-8">
          <title>CV</title>
          <style>
             .body {
                background-image: url("https://krot.info/uploads/posts/2020-01/thumbs/1579543317_39-73.jpg");
                background-size: cover;
             }
             .container {
             max-width: 800px;
             margin: auto;
             padding: 30px;
             font-size: 16px;
             line-height: 20px;
             color: #555;
             }
             .list__item {
                font-size: 18px;
                margin: 5px 0;
             }
             .list__title {
                margin-bottom: 10px;
                font-size: 24px;
                font-weight: bold;
             }
             .title {
                font-size: 32px;
                font-weight: bold;
                margin: 30px 0;
             }
             .content {
                font-size: 24px;
                margin: 15px 0;
             }
          </style>
       </head>
       <body class="body">
       <div class="container">
         <div class="title">${first_name} ${last_name} (${current_position})</div>
          <div class="content">
            Core skills is ${skills.map((skill) => (
            `<span class="content">
                ${skill}
            </span>`
            ))}
          </div>
          <div class="title">
            Projects
          </div>
          ${projectActivities.map((project, id) => (
            `<div>
              <span class="list__title">
                ${id + 1 + ". " + project.position}${project.description ? (", " + project.description) : ""}
              </span>
                ${project.techs.map((tech) => (
             `<div class="list__item">
                    - ${tech}
                  </div>`
                )).join('')}
              </div>`
          )).join('')}
       </div>
       </body>
    </html>
    `;
};
