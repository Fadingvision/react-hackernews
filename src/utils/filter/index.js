
/**
 * 首字母大写
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
export function capitalize(str) {
	return String(str).toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
}