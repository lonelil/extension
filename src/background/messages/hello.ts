import type { PlasmoMessaging } from '@plasmohq/messaging';

import { hasPermission } from '~hooks/usePermission';
import { getVersion } from '~hooks/useVersion';
import type { BaseRequest } from '~types/request';
import type { BaseResponse } from '~types/response';
import { isDomainWhitelisted } from '~utils/storage';

type Response = BaseResponse<{
  version: string;
  allowed: boolean;
  hasPermission: boolean;
}>;

const handler: PlasmoMessaging.MessageHandler<BaseRequest, Response> = async (req, res) => {
  console.log('hello');
  try {
    const version = getVersion();
    console.log('hello2');
    res.send({
      success: true,
      version,
      allowed: await isDomainWhitelisted(req.sender.tab.url),
      hasPermission: true /* await hasPermission(new URL(req.sender.tab.url).origin) */,
    });
    console.log('done');
  } catch (err) {
    console.error(err);
    res.send({
      success: false,
      error: err.message,
    });
    console.log('done error');
  }
};

export default handler;
