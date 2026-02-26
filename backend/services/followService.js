import { ObjectId } from "mongodb";
import { verifyToken } from "../utils/jwtToken.js";

export const getAuthToken = (authorization = "") => {
  if (!authorization.startsWith("Bearer ")) {
    return {
      ok: false,
      status: 403,
      message: "Missing or invalid auth header",
    };
  }
  const token = authorization.slice(7).trim();
  if (!token) {
    return { ok: false, status: 403, message: "Token is required" };
  }
  try {
    const payload = verifyToken(token);
    if (!payload?.id) {
      return { ok: false, status: 403, message: "Invalid token payload" };
    }

    return {
      ok: true,
      status: 200,
      userId: payload.id,
      userObjectId: new ObjectId(payload.id),
      payload,
    };
  } catch {
    return { ok: false, status: 403, message: "Invalid or expired token" };
  }
};

export const getFollowersData = async ({ userId, db }) => {
  if (!userId) {
    return { followers: [], followersCount: 0, followingCount: 0 };
  }

  const users = db.collection("users");
  const follows = db.collection("follows");
  const usersStats = db.collection("usersStats");

  const followerDocs = await follows.find({ followingId: userId }).toArray();
  const followerIds = followerDocs.map((doc) => doc.followerId);

  const followers = followerIds.length
    ? await users
        .find({ _id: { $in: followerIds } }, { projection: { password: 0 } })
        .toArray()
    : [];

  const followersCount = followerIds.length;
  const followingCount = await follows.countDocuments({
    followerId: userId,
  });

  // /////////////////////////////////  THIS NEED TO BE REFACTORED  /////////////////////////////////////////////////////////////
  const statsArr = followerIds.length
    ? await usersStats.find({ userId: { $in: followerIds } }).toArray()
    : [];

  const statsMap = new Map(
    statsArr.map((stat) => [stat.userId?.toString(), stat]),
  );

  const followersWithStats = followers.map((user) => ({
    ...user,
    stats: statsMap.get(user._id?.toString()) ?? null,
  }));
  console.log(followersWithStats);
  return {
    followers: followersWithStats,
    followersCount,
    followingCount,
  };
};

export const getFollowingData = async ({ userId, db }) => {
  if (!userId) {
    return { following: [], followersCount: 0, followingCount: 0 };
  }

  const users = db.collection("users");
  const follows = db.collection("follows");
  const usersStats = db.collection("usersStats");

  const followingDocs = await follows.find({ followerId: userId }).toArray();
  const followingIds = followingDocs.map((doc) => doc.followingId);

  const following = followingIds.length
    ? await users
        .find({ _id: { $in: followingIds } }, { projection: { password: 0 } })
        .toArray()
    : [];

  const followingCount = followingIds.length;
  const followersCount = await follows.countDocuments({
    followingId: userId,
  });
  // /////////////////////////////////  THIS NEED TO BE REFACTORED  /////////////////////////////////////////////////////////////
  const statsArr = followingIds.length
    ? await usersStats.find({ userId: { $in: followingIds } }).toArray()
    : [];

  const statsMap = new Map(
    statsArr.map((stat) => [stat.userId?.toString(), stat]),
  );

  const followingWithStats = following.map((user) => ({
    ...user,
    stats: statsMap.get(user._id?.toString()) ?? null,
  }));
  console.log(followingWithStats);
  return { following: followingWithStats, followersCount, followingCount };
};
