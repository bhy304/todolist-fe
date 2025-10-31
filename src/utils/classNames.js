/**
 * 기본 클래스명과 타입별 클래스명을 조합하여 반환합니다.
 * @param {string} baseClassName - 기본 클래스명 (예: 'button', 'input')
 * @param {string|string[]} values - 단일 값 또는 값 배열
 * @param {Object|Object[]} maps - 단일 매핑 객체 또는 매핑 객체 배열
 * @returns {string} 조합된 클래스명 문자열
 * @example
 * // 단일 값 사용
 * getClassName('input', 'ERROR', TEXTFIELD_VARIANTS) // 'input error'
 * 
 * // 여러 값 사용
 * getClassName('button', ['PRIMARY', 'FULL'], [BUTTON_VARIANTS, BUTTON_SIZE]) // 'button primary full'
 */
export const getClassName = (baseClassName, values, maps) => {
  const classNames = [baseClassName];

  if (!values || !maps) {
    return baseClassName;
  }

  const valueArray = Array.isArray(values) ? values : [values];
  const mapArray = Array.isArray(maps) ? maps : [maps];

  valueArray.forEach((value, index) => {
    const map = mapArray[index];
    if (value && map && map[value]) {
      classNames.push(map[value]);
    }
  });

  return classNames.filter(Boolean).join(' ');
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
