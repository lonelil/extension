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
  try {
    const version = getVersion();
    res.send({
      success: true,
      version,
      allowed: await isDomainWhitelisted(req.sender.tab.url),
      hasPermission: await hasPermission(),
    });
  } catch (err) {
    res.send({
      success: false,
      error: err.message,
    });
  }
};

export default handler;
