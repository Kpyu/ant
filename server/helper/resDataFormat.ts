export function formatRes(obj: any, isError: boolean, msg?: string): any {
  if (!isError) {
    return {
      success: true,
      code: '00000',
      data: obj,
    };
  } else {
    return {
      success: false,
      code: '00001',
      message: msg,
    };
  }
}
