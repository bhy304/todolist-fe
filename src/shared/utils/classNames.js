/**
 * 기본 클래스명과 타입별 클래스명을 조합하여 반환합니다.
 * @param {string} baseClassName - 기본 클래스명 (예: 'button', 'input')
 * @param {string} type - 타입 문자열 (예: 'primary', 'focus')
 * @param {Object} typeMap - 타입 매핑 객체 (예: ButtonType, TextfieldType)
 * @returns {string} 조합된 클래스명 문자열
 */
export const getClassName = (baseClassName, type, typeMap) => {
  const classNames = [baseClassName];

  if (type && typeMap[type]) {
    classNames.push(typeMap[type]);
  }

  return classNames.join(' ');
};

/**
 * 여러 클래스명을 조건부로 조합합니다.
 * @param {...(string|boolean|undefined|null)} classes - 클래스명 또는 조건
 * @returns {string} 조합된 클래스명 문자열
 * @example
 * classNames('button', isActive && 'active', 'primary') // 'button active primary'
 */
export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};
