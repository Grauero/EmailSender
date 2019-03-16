import keys from '../../config/keys';

export interface ISurveyTemplate {
  body: string;
  id: string;
}

export default (survey: ISurveyTemplate) => `
    <html>
      <body>
        <div style="text-align: center;">
          <h3>Give Us Feedback</h3>
          <p>Please answer the question:</p>
          <p>${survey.body}</p>
          <div>
            <a href="${keys.redirectDomain}/api/surveys/${survey.id}/yes">
              Yes
            </a>
          </div>
          <div>
            <a href="${keys.redirectDomain}/api/surveys/${survey.id}/no">
              No
            </a>
          </div>
        </div>
      </body>
    </html>
  `;
