import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@redux/store/store";
import { toggleMenu, closeMenu } from "@redux/slices/uiSlices/uiSlice";

export const useMenuToggle = () => {
    const dispatch = useDispatch();
    const isOpenMenu = useSelector((state: RootState) => state.ui.isOpenMenu);

    const handleToggleMenu = () => {
        dispatch(toggleMenu());
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 830 && isOpenMenu) {
                dispatch(closeMenu());
            }
        };

        // Add event listener
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [dispatch, isOpenMenu]);

    return { isOpenMenu, handleToggleMenu };
};
