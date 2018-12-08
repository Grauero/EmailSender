const keys = require('../../config/keys');

function generateTemplate(survey) {
  return `
    <html>
      <body>
        <div style="text-align: center;">
          <h3>Give Us Feedback</h3>
          <p>Please answer the question:</p>
          <p>${survey.body}</p>
          <div>
            <a href="${keys.redirectDomain}/api/surveys/thanks">Yes</a>
          </div>
          <div>
            <a href="${keys.redirectDomain}/api/surveys/thanks">No</a>
          </div>
        </div>
      </body>
    </html>
  `;
}

module.exports = generateTemplate;
