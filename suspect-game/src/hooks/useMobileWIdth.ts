
export const useMobileWidth = () => {

if (typeof window === 'undefined') {
    return { isMobileWidth: false };
}
return { isMobileWidth: window.innerWidth < 600 };

}