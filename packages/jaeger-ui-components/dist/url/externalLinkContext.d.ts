import React from 'react';
/**
 * There are several places where external links to spans are created. The url layout though is something
 * that should be decided on the application level and not on the component level but at the same time
 * propagating the factory function everywhere could be cumbersome so we use this context for that.
 */
declare const ExternalLinkContext: React.Context<((traceID: string, spanID: string) => string) | undefined>;
export default ExternalLinkContext;
