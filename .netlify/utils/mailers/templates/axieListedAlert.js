module.exports = ({ id, eth }) => {
  return `
  <body style="margin: 0; width: 100%; padding: 0; word-break: break-word; -webkit-font-smoothing: antialiased; background-color: #f3f4f6;">
  <div style="display: none;">The following axies matched your alert criteria&#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &zwnj;
    &#160;&#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &zwnj;
    &#160;&#847; &#847; &#847; &#847; &#847; </div>
<div role="article" aria-roledescription="email" aria-label="Axie listed notification" lang="en">
  <table style="width: 100%; font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif;" cellpadding="0" cellspacing="0" role="presentation">
    <tr>
      <td align="center" style="background-color: #1f2937;">
        <table class="sm-w-full" style="width: 600px;" cellpadding="0" cellspacing="0" role="presentation">
          <tr>
            <td class="sm-py-32 sm-px-24" style="padding: 48px; padding-bottom: 14px; text-align: center;">
              <img src="https://www.rinocu.com/images/rinocu-discord-logo.png" target="_blank" rel="noreferrer noopener" style="max-width: 100%; vertical-align: middle; line-height: 100%; border: 0; height: 48px; width: 48px;" alt="">
            </td>
          </tr>
          <tr>
            <td align="center" class="sm-px-24">
              <table style="width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td class="sm-px-24" style="border-radius: 4px; background-color: #374151; padding: 48px; text-align: left; font-size: 16px; line-height: 24px; color: #d1d5db;">
                    <h1 style="font-size: 30px; font-weight: 700; color: #6366f1;">
                      An Axie has been listed!
                    </h1>
                    <p>This axie matched your alert criteria:</p>
                    <p style="margin-bottom: 24px;"></p>
                    <div style="display: flex; flex-direction: column; line-height: 100%;">
                      <a href="https://marketplace.axieinfinity.com/axie/${id}/" target="_blank" rel="noreferrer noopener" style="margin-bottom: 12px; border-radius: 4px; background-color: #7c3aed; padding-top: 16px; padding-bottom: 16px; padding-left: 24px; padding-right: 24px; text-align: center; font-size: 16px; font-weight: 600; color: #ffffff; text-decoration: none;">
                        Axie #${id} &rarr; ${eth}ETH
                      </a>
                    </div>
                    <table style="width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
                      <tr>
                        <td style="padding-top: 32px; padding-bottom: 32px;">
                          <div style="height: 1px; background-color: #e5e7eb; line-height: 1px;">
                            &zwnj;
                          </div>
                        </td>
                      </tr>
                    </table>
                    <p style="margin-bottom: 16px;">
                      Not sure why you received this email? Please
                      <a href="https://www.rinocu.com/contact" target="_blank" rel="noreferrer noopener" class="hover-no-underline" style="color: #3b82f6; text-decoration: underline;">let us know</a>.
                    </p>
                    <p style="margin-bottom: 16px;">Thanks, <br>The Rinocu Team</p>
                  </td>
                </tr>
                <tr>
                  <td style="height: 48px;"></td>
                </tr>
                <tr>
                  <td style="padding-left: 24px; padding-right: 24px; text-align: center; font-size: 12px; color: #d1d5db;">
                    <p style="margin-bottom: 4px; text-transform: uppercase;">Powered by Rinocu.com</p>
                    <p style="margin-bottom: 12px; font-style: italic;">
                      The best tools for the crypto investor
                    </p> </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</div>
</body>
  `;
};
