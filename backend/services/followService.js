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

export const getFollowersData = async ({ userId, db, page, limit }) => {
  if (!userId) {
    return {
      followers: [],
      followersCount: 0,
      followingCount: 0,
      page: 1,
      limit: 25,
      total: 0,
      hasMore: false,
    };
  }
  const normalizedPage = Math.max(Number(page) || 1, 1);
  const normalizedLimit = Math.min(Math.max(Number(limit) || 25, 1), 25);
  const skip = (normalizedPage - 1) * normalizedLimit;

  const users = db.collection("users");
  const follows = db.collection("follows");
  const usersStats = db.collection("usersStats");

  const followerDocs = await follows
    .find({ followingId: userId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(normalizedLimit)
    .toArray();
  const followerIds = followerDocs.map((doc) => doc.followerId);

  const followersCount = await follows.countDocuments({
    followingId: userId,
  });
  const followingCount = await follows.countDocuments({
    followerId: userId,
  });

  const followers = followerIds.length
    ? await users
        .find({ _id: { $in: followerIds } }, { projection: { password: 0 } })
        .toArray()
    : [];

  const statsArr = followerIds.length
    ? await usersStats.find({ userId: { $in: followerIds } }).toArray()
    : [];

  const userMap = new Map(followers.map((user) => [String(user._id), user]));
  const statsMap = new Map(
    statsArr.map((stat) => [stat.userId?.toString(), stat]),
  );

  const followersWithStats = followerIds
    .map((id) => userMap.get(String(id)))
    .filter(Boolean)
    .map((user) => ({
      ...user,
      stats: statsMap.get(user._id?.toString()) ?? null,
    }));

  return {
    followers: followersWithStats,
    followersCount,
    followingCount,
    page: normalizedPage,
    limit: normalizedLimit,
    total: followersCount,
    hasMore: skip + followersWithStats.length < followersCount,
  };
};

export const getFollowingData = async ({ userId, db, page, limit }) => {
  if (!userId) {
    return {
      following: [],
      followersCount: 0,
      followingCount: 0,
      page: 1,
      limit: 25,
      total: 0,
      hasMore: false,
    };
  }
  const normalizedPage = Math.max(Number(page) || 1, 1);
  const normalizedLimit = Math.min(Math.max(Number(limit) || 25, 1), 25);
  const skip = (normalizedPage - 1) * normalizedLimit;

  const users = db.collection("users");
  const follows = db.collection("follows");
  const usersStats = db.collection("usersStats");

  const followingDocs = await follows
    .find({ followerId: userId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(normalizedLimit)
    .toArray();
  const followingIds = followingDocs.map((doc) => doc.followingId);

  const followingCount = await follows.countDocuments({
    followerId: userId,
  });

  const followersCount = await follows.countDocuments({
    followingId: userId,
  });

  const following = followingIds.length
    ? await users
        .find({ _id: { $in: followingIds } }, { projection: { password: 0 } })
        .toArray()
    : [];

  const statsArr = followingIds.length
    ? await usersStats.find({ userId: { $in: followingIds } }).toArray()
    : [];

  const userMap = new Map(following.map((user) => [String(user._id), user]));
  const statsMap = new Map(
    statsArr.map((stat) => [stat.userId?.toString(), stat]),
  );

  const followingWithStats = followingIds
    .map((id) => userMap.get(String(id)))
    .filter(Boolean)
    .map((user) => ({
      ...user,
      stats: statsMap.get(user._id?.toString()) ?? null,
    }));

  return {
    following: followingWithStats,
    followersCount,
    followingCount,
    page: normalizedPage,
    limit: normalizedLimit,
    total: followingCount,
    hasMore: skip + followingWithStats.length < followingCount,
  };
};
