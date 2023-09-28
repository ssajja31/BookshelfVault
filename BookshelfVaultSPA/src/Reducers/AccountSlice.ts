import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { User } from "../models/user";
import agent from "../Api/agent";
import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { json } from "stream/consumers";

interface AccountState {
  user: User | null;
}

const initialState: AccountState = {
  user: null,
};

export const loginUser = createAsyncThunk<User, FieldValues>(
  "account/loginUser",
  async (data, thunkAPI) => {
    try {
      const user = await agent.Account.login(data);
      localStorage.setItem("user", JSON.stringify(user));

      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const fetchCurrentUser = createAsyncThunk<User>(
  "account/fetchCurrentUser",
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem("user")!)));
    try {
      const user = await agent.Account.currentUser();
      localStorage.setItem("user", JSON.stringify(user));

      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  },
  {
    condition: () => {
      if (!localStorage.getItem("user")) return false;
    },
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    logOut: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.rejected, (state) => {
      state.user = null;
      localStorage.removeItem("user");
    });
    builder.addMatcher(
      isAnyOf(loginUser.fulfilled, fetchCurrentUser.fulfilled),
      (state, action) => {
        state.user = action.payload;
      }
    );
    builder.addMatcher(isAnyOf(loginUser.rejected), (state, action) => {
      console.log(action.payload);
    });
  },
});

export const { logOut, setUser } = accountSlice.actions;
