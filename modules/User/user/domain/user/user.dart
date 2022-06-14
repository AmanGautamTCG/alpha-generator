import 'dart:convert';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:hive/hive.dart';

part 'user.freezed.dart';
part 'user.g.dart';

@freezed
class User with _$User {
  @JsonSerializable(includeIfNull: false)
  const factory User({
    @JsonKey(name: '_id') String? id,
    String? uid,
    String? self,
    String? actID,
    String? name,
    String? mediaID,
    String? caption,
    int? views,
    bool? isActive,
    bool? isDeleted,
    String? description,
    DateTime? createdOn,
    DateTime? updatedOn,
  }) = _User;

  factory User.fromJson(Map<String, dynamic> json) =>
      _$UserFromJson(json);
  
  factory User.fromBox({required UserBox box}) =>
      User.fromJson(json.decode(box.data as String) as Map<String, dynamic>);    
}

@HiveType(typeId: 5, adapterName: 'UserBoxAdapter')
class UserBox {
  UserBox({this.self, this.data});

  factory UserBox.fromDomain({
    required User domain,
  }) =>
      UserBox(self: domain!.self, data: json.encode(domain));

  @HiveField(0)
  String? self;
  @HiveField(1)
  String? data;
}

