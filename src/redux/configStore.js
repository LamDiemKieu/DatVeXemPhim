import data from "../danhSachGhe.json";
import { configureStore } from "@reduxjs/toolkit";
const initialState = {
  arrGhe: data,
};

export const store = configureStore({
  reducer: {
    duLieu: (state = initialState, action) => {
      switch (action.type) {
        case "ghedachon": {
          const newArrGhe = state.arrGhe.map((hang) => {
            const updateddanhSachGhe = hang.danhSachGhe.map((ghe) => {
              if (
                ghe.soGhe === action.payload.soGhe &&
                ghe.gio === action.payload.gio
              ) {
                return { ...ghe, daChon: !ghe.daChon };
              }
              return ghe;
            });
            return { ...hang, danhSachGhe: updateddanhSachGhe };
          });
          return {
            ...state,
            arrGhe: newArrGhe,
          };
        }
        case "xacnhan": {
          console.log(action.payload);
          const newArrGhe = state.arrGhe.map((hang) => {
            const updateddanhSachGhe = hang.danhSachGhe.map((ghe) => {
              if (ghe.daChon === true) {
                return {
                  ...ghe,
                  daDat: true,
                  daChon: false,
                  khachHang: action.payload.ten,
                  soDT: action.payload.soDT,
                  gio: action.payload.gio,
                  ngay: action.payload.ngay,
                };
              }
              return ghe;
            });
            return { ...hang, danhSachGhe: updateddanhSachGhe };
          });
          return {
            ...state,
            arrGhe: newArrGhe,
          };
        }
        case "chonlai": {
          let newArrGhe = state.arrGhe.map((hang) => {
            let newDanhSachGhe = hang.danhSachGhe.map((ghe) => ({
              ...ghe,
              daChon: false,
            }));

            return {
              ...hang,
              danhSachGhe: newDanhSachGhe,
            };
          });

          return {
            ...state,
            arrGhe: newArrGhe,
          };
        }
        default:
          return state;
      }
    },
  },
});
